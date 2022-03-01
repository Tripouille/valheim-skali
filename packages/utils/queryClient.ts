import { QueryClient } from 'react-query';

export const queryClient = new QueryClient();

export enum QueryKeys {
  USERS = 'users',
  ROLES = 'roles',
}
