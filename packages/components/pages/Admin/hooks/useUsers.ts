import { useCallback } from 'react';
import { useQuery, UseQueryResult } from 'react-query';
import axios from 'axios';
import { APIRoute } from '@packages/utils/routes';
import { QueryKeys, QueryTypes } from '@packages/utils/queryClient';
import { User } from '@packages/data/user';

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
  const filterUsers = useCallback(
    (allUsers: QueryTypes[QueryKeys.USERS]) => {
      //TODO
      return allUsers;
    },
    [filter],
  );

  const usersQuery = useQuery(QueryKeys.USERS, getUsers, {
    select: filterUsers,
  });

  return usersQuery;
};
