import { useRouter } from 'next/router';
import { Session } from 'next-auth';
import { useCallback, useMemo } from 'react';
import { QueryKey, useQuery, UseQueryOptions } from 'react-query';
import axios from 'axios';
import { APIRoute, getSigninRoute } from '../routes';
import { AuthError, Permissions, SessionStatus, userHasRequiredPermissions } from '../auth';

export async function fetchSession(): Promise<Session | null> {
  const { data: session } = await axios.get(APIRoute.SESSION);
  if (Object.keys(session).length) {
    return session;
  }
  return null;
}

interface UseSessionParameters {
  required?: boolean;
  redirectTo?: string;
  queryConfig?: UseQueryOptions<Session | null, unknown, Session | null, QueryKey>;
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

export const useSession = ({
  required = false,
  redirectTo = getSigninRoute(AuthError.SESSION_REQUIRED),
  queryConfig = {},
}: UseSessionParameters = {}): UseSessionReturn => {
  const router = useRouter();

  const { data, status } = useQuery<Session | null, unknown, Session | null, QueryKey>(
    ['session'],
    fetchSession,
    {
      ...queryConfig,
      onSettled(session, error) {
        if (queryConfig.onSettled) queryConfig.onSettled(session, error);
        if (session || !required) return;
        router.push(redirectTo);
      },
    },
  );

  const hasRequiredPermissions = useCallback(
    (requiredPermissions: Permissions) => {
      return data ? userHasRequiredPermissions(data.permissions, requiredPermissions) : false;
    },
    [data],
  );

  const session = useMemo(() => {
    if (data) {
      return {
        data,
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
  }, [data, status, hasRequiredPermissions]) as UseSessionReturn;

  return session;
};
