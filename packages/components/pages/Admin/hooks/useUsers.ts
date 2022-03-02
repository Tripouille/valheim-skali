import { useCallback } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { APIRoute } from '@packages/utils/routes';
import { QueryKeys, QueryTypes } from '@packages/utils/queryClient';

export enum UserQueryFilter {
  MEMBER = 'member',
  NON_MEMBER = 'non_member',
}

export const getUsers = async () => {
  const { data } = await axios.get(APIRoute.USERS);
  return data;
};

export const useUsers = (filter: UserQueryFilter): QueryTypes[QueryKeys.USERS] => {
  const filterUsers = useCallback(
    (allUsers: QueryTypes[QueryKeys.USERS]) => {
      //TODO
      return allUsers;
    },
    [filter],
  );

  const fallback: QueryTypes[QueryKeys.USERS] = [];
  const { data: users = fallback } = useQuery(QueryKeys.USERS, getUsers, {
    select: filterUsers,
  });

  return users;
};
