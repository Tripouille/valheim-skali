import { useRouter } from 'next/router';
import { Session } from 'next-auth';
import { QueryKey, useQuery, UseQueryOptions } from 'react-query';
import axios from 'axios';
import { APIRoute, getSigninRoute } from '../routes';
import { AuthError, SessionStatus } from '../auth';

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

type UseSessionReturn =
  | {
      data: Session;
      status: SessionStatus.AUTHENTICATED;
    }
  | {
      data?: null;
      status: SessionStatus.UNAUTHENTICATED | SessionStatus.LOADING;
    };

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

  if (data) {
    return {
      data,
      status: SessionStatus.AUTHENTICATED,
    };
  } else {
    return {
      data: null,
      status:
        status === SessionStatus.LOADING ? SessionStatus.LOADING : SessionStatus.UNAUTHENTICATED, //???
    };
  }
};
