import { QueryClient } from 'react-query';
import axios from 'axios';
import { createStandaloneToast } from '@chakra-ui/react';
import { User } from '@packages/data/user';
import { Role } from '@packages/data/role';
import theme from '@packages/theme';
import { getMessageFromError } from './error';

const toast = createStandaloneToast({ theme });

const queryErrorHandler = (error: unknown) => {
  const id = axios.isAxiosError(error) ? `${error.config.method}-${error.config.url}` : undefined;

  toast({
    id,
    title: getMessageFromError(error),
    status: 'error',
    variant: 'subtle',
    duration: 3000,
    isClosable: true,
    containerStyle: { color: 'darkred' },
    position: 'bottom-right',
  });
  // toast({
  //   title,
  //   status: 'success',
  //   duration: null,
  //   variant: 'subtle',
  //   isClosable: true,
  //   containerStyle: { color: 'darkgreen' },
  //   position: 'bottom-right',
  // });
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      onError: queryErrorHandler,
      staleTime: 2000,
    },
    mutations: {
      onError: queryErrorHandler,
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
