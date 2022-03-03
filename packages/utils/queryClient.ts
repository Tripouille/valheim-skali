import { QueryClient } from 'react-query';
import axios from 'axios';
import { User } from '@packages/data/user';
import { Role } from '@packages/data/role';
import { getMessageFromError } from './error';
import { displayErrorToast } from './toast';

export const queryErrorHandler = (error: unknown) => {
  const id = axios.isAxiosError(error) ? `${error.config.method}-${error.config.url}` : undefined;

  displayErrorToast({
    id,
    title: getMessageFromError(error),
  });
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      onError: queryErrorHandler,
      staleTime: 2000,
    },
  },
});

export enum QueryKeys {
  USERS = 'users',
  ROLES = 'roles',
}

export type QueryTypes = {
  [QueryKeys.USERS]: User[];
  [QueryKeys.ROLES]: Role[];
};
