import { Session } from 'next-auth';
import { QueryClient } from 'react-query';
import axios from 'axios';
import { toast } from '@chakra-ui/react';
import { User } from '@packages/data/user';
import { Role } from '@packages/data/role';
import { Event } from '@packages/data/event';
import { getMessageFromError } from './error';
import { displayErrorToast } from './toast';
import { Permissions } from './auth';

export const queryErrorHandler = (error: unknown) => {
  const id = axios.isAxiosError(error) ? error.config.url : undefined;

  if (!id || !toast.isActive(id)) {
    displayErrorToast({
      id,
      title: getMessageFromError(error),
    });
  }
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
  EVENTS = 'events',
  SESSION = 'session',
  VISITOR = 'visitor',
}

export type QueryTypes = {
  [QueryKeys.USERS]: User[];
  [QueryKeys.ROLES]: Role[];
  [QueryKeys.EVENTS]: Event[];
  [QueryKeys.SESSION]: Session | null;
  [QueryKeys.VISITOR]: Permissions;
};
