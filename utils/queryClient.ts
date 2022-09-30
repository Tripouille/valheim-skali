import axios from 'axios';
import { Session } from 'next-auth';
import { toast } from '@chakra-ui/react';
import { InfiniteData, QueryClient } from '@tanstack/react-query';
import { Application, ApplicationAssociableUser, WithDiscordInfos } from 'data/application';
import { EventsPage } from 'data/event';
import { Role } from 'data/role';
import { User } from 'data/user';
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
  SESSION = 'session',
  VISITOR = 'visitor',
  EVENTS = 'events',
  ROLES = 'roles',
  USERS = 'users',
  FIND_WIKI_PAGE = 'find_wiki_page',
  FEATURED_WIKI_PAGES = 'featured_wiki_pages',
  WIKI_PAGES = 'wiki_pages',
  WIKI_PROPOSALS = 'wiki_proposals',
  APPLICATIONS = 'applications',
  APPLICATION_ASSOCIABLE_USERS = 'application_associable_users',
}

export type QueryTypes = {
  [QueryKeys.SESSION]: Session | null;
  [QueryKeys.VISITOR]: Permissions;
  [QueryKeys.EVENTS]: InfiniteData<EventsPage>;
  [QueryKeys.ROLES]: Role[];
  [QueryKeys.USERS]: User[];
  [QueryKeys.WIKI_PAGES]: WikiPage[];
  [QueryKeys.WIKI_PROPOSALS]: WikiProposalWithAuthor[];
  [QueryKeys.APPLICATIONS]: WithDiscordInfos<Application>[];
  [QueryKeys.APPLICATION_ASSOCIABLE_USERS]: ApplicationAssociableUser[];
};
