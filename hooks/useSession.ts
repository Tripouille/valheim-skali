import axios from 'axios';
import { Session } from 'next-auth';
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AuthError, SessionStatus } from 'utils/auth';
import { Permissions, permissionsMeetRequirement } from 'utils/permissions';
import { QueryKeys, QueryTypes } from 'utils/queryClient';
import { APIRoute, getSigninRoute } from 'utils/routes';

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
) & { hasRequiredPermissions: (requiredPermissions: Permissions | Permissions[]) => boolean };

const useSession = ({
  required = false,
  redirectTo = getSigninRoute(AuthError.SESSION_REQUIRED),
  queryConfig = {},
}: UseSessionParameters = {}): UseSessionReturn => {
  const router = useRouter();

  const { data: sessionData, status } = useQuery<QueryTypes[QueryKeys.SESSION]>(
    [QueryKeys.SESSION],
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
    [QueryKeys.VISITOR],
    getVisitorPermissionsFromServer,
    { enabled: !sessionData },
  );

  const hasRequiredPermissions = useCallback(
    (requiredPermissions: Permissions | Permissions[]) => {
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
