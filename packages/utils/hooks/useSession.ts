import { useRouter } from 'next/router';
import { Session } from 'next-auth';
import { useCallback, useMemo } from 'react';
import { useQuery, UseQueryOptions } from 'react-query';
import axios from 'axios';
import { APIRoute, getSigninRoute } from '../routes';
import { AuthError, Permissions, SessionStatus, permissionsMeetRequirement } from '../auth';
import { QueryKeys, QueryTypes } from '../queryClient';

export async function getSessionFromServer(): Promise<QueryTypes[QueryKeys.SESSION]> {
  const { data: session } = await axios.get<Session | Record<string, never>>(APIRoute.SESSION);
  if (Object.keys(session).length) {
    return session as Session;
  }
  return null;
}

export async function getVisitorPermissionsFromServer(): Promise<QueryTypes[QueryKeys.VISITOR]> {
  const { data: visitorPermissions } = await axios.get<QueryTypes[QueryKeys.VISITOR]>(
    APIRoute.VISITOR,
  );
  return visitorPermissions;
}

interface UseSessionParameters {
  required?: boolean;
  redirectTo?: string;
  queryConfig?: UseQueryOptions<QueryTypes[QueryKeys.SESSION]>;
}

export type UseSessionReturn = (
  | {
      data: Session;
      status: SessionStatus.AUTHENTICATED;
    }
  | {
      data?: null;
      status: SessionStatus.UNAUTHENTICATED | SessionStatus.LOADING;
    }
) & { hasRequiredPermissions: (requiredPermissions: Permissions) => boolean };

const useSession = ({
  required = false,
  redirectTo = getSigninRoute(AuthError.SESSION_REQUIRED),
  queryConfig = {},
}: UseSessionParameters = {}): UseSessionReturn => {
  const router = useRouter();

  const { data: sessionData, status } = useQuery<QueryTypes[QueryKeys.SESSION]>(
    QueryKeys.SESSION,
    getSessionFromServer,
    {
      ...queryConfig,
      onSettled(session, error) {
        if (queryConfig.onSettled) queryConfig.onSettled(session, error);
        if (session || !required) return;
        router.push(redirectTo);
      },
    },
  );

  const { data: visitorPermissions } = useQuery<QueryTypes[QueryKeys.VISITOR]>(
    QueryKeys.VISITOR,
    getVisitorPermissionsFromServer,
    {
      enabled: !sessionData,
    },
  );

  const hasRequiredPermissions = useCallback(
    (requiredPermissions: Permissions) => {
      return sessionData
        ? permissionsMeetRequirement(sessionData.permissions, requiredPermissions)
        : permissionsMeetRequirement(visitorPermissions ?? {}, requiredPermissions);
    },
    [sessionData, visitorPermissions],
  );

  const session = useMemo(() => {
    if (sessionData) {
      return {
        data: sessionData,
        status: SessionStatus.AUTHENTICATED,
        hasRequiredPermissions,
      };
    } else {
      return {
        data: null,
        status:
          status === SessionStatus.LOADING ? SessionStatus.LOADING : SessionStatus.UNAUTHENTICATED,
        hasRequiredPermissions,
      };
    }
  }, [sessionData, status, hasRequiredPermissions]) as UseSessionReturn;

  return session;
};

export default useSession;
