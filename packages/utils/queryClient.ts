import { QueryClient } from 'react-query';
import { User } from '@packages/data/user';
import { Role } from '@packages/data/role';

export const queryClient = new QueryClient();

export enum QueryKeys {
  USERS = 'users',
  ROLES = 'roles',
}

export type QueryTypes = {
  [QueryKeys.USERS]: User[];
  [QueryKeys.ROLES]: Role[];
};
