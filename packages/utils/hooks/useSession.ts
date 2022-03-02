import { useRouter } from 'next/router';
import { Session } from 'next-auth';
import { QueryKey, useQuery, UseQueryOptions } from 'react-query';
import axios from 'axios';
import { APIRoute, getSigninRoute } from '../routes';
import { AuthError } from '../auth';

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
      status: 'authenticated';
    }
  | {
      data?: null;
      status: 'unauthenticated' | 'loading';
    };

export const useSession = ({
  required = false,
  redirectTo = getSigninRoute(AuthError.SESSION_REQUIRED),
  queryConfig = {},
}: UseSessionParameters = {}): UseSessionReturn => {
  const router = useRouter();

  const { data: sessionData, status } = useQuery<Session | null, unknown, Session | null, QueryKey>(
    ['session'],
    fetchSession,
    {
      ...queryConfig,
      onSettled(data, error) {
        if (queryConfig.onSettled) queryConfig.onSettled(data, error);
        if (data || !required) return;
        router.push(redirectTo);
      },
    },
  );

  if (sessionData) {
    return {
      data: sessionData,
      status: 'authenticated',
    };
  } else {
    return {
      data: null,
      status: status === 'loading' ? 'loading' : 'unauthenticated',
    };
  }
};
