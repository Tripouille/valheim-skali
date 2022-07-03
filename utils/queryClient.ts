import { Session } from 'next-auth';
import { QueryClient } from 'react-query';
import axios from 'axios';
import { toast } from '@chakra-ui/react';
import { User } from 'data/user';
import { Role } from 'data/role';
import { Event } from 'data/event';
import { WikiPage, WikiProposalWithAuthor } from 'data/wiki';
import { getMessageFromError } from './error';
import { displayErrorToast } from './toast';
import { Permissions } from './permissions';

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
  EVENTS = 'events',
  ROLES = 'roles',
  USERS = 'users',
  WIKI = 'wiki',
  WIKI_PROPOSALS = 'wiki_proposals',
  SESSION = 'session',
  VISITOR = 'visitor',
}

export type QueryTypes = {
  [QueryKeys.EVENTS]: Event[];
  [QueryKeys.ROLES]: Role[];
  [QueryKeys.USERS]: User[];
  [QueryKeys.WIKI]: WikiPage[];
  [QueryKeys.WIKI_PROPOSALS]: WikiProposalWithAuthor[];
  [QueryKeys.SESSION]: Session | null;
  [QueryKeys.VISITOR]: Permissions;
};
