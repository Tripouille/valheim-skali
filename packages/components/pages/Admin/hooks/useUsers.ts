import { useCallback } from 'react';
import { useQuery, UseQueryResult } from 'react-query';
import axios from 'axios';
import { User } from '@packages/data/user';
import { APIRoute } from '@packages/utils/routes';
import { QueryKeys, QueryTypes } from '@packages/utils/queryClient';
import { useSession } from '@packages/utils/hooks/useSession';
import { PermissionCategory, PermissionPrivilege } from '@packages/utils/auth';

export enum UserQueryFilter {
  MEMBER = 'member',
  NON_MEMBER = 'non_member',
}

export type UseUsersReturn =
  | {
      users: QueryTypes[QueryKeys.USERS];
      usersStatus: 'success' | 'error';
    }
  | {
      users: undefined;
      usersStatus: UseQueryResult<QueryTypes[QueryKeys.USERS]>['status'];
    };

export const getUsers = async (): Promise<User[]> => {
  const { data } = await axios.get<User[]>(APIRoute.USERS);

  return data;
};

export const useUsers = (filter: UserQueryFilter) => {
  const session = useSession();

  const filterUsers = useCallback(
    (allUsers: QueryTypes[QueryKeys.USERS]) => {
      //TODO
      return allUsers;
    },
    [filter],
  );

  const usersQuery = useQuery(QueryKeys.USERS, getUsers, {
    enabled: session.hasRequiredPermissions({
      [PermissionCategory.USER]: PermissionPrivilege.READ,
    }),
    select: filterUsers,
  });

  return usersQuery;
};
