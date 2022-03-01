import { useCallback } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { User } from '@packages/data/user';
import { APIRoute } from '@packages/utils/routes';
import { QueryKeys } from '@packages/utils/queryClient';

export enum UserQueryFilter {
  MEMBER = 'member',
  NON_MEMBER = 'non_member',
}

export const getUsers = async () => {
  const { data } = await axios.get(APIRoute.USERS);
  return data;
};

export const useUsers = (filter: UserQueryFilter): User[] => {
  const filterUsers = useCallback(
    (allUsers: User[]) => {
      //TODO
      return allUsers;
    },
    [filter],
  );

  const fallback: User[] = [];
  const { data: users = fallback } = useQuery(QueryKeys.USERS, getUsers, {
    select: filterUsers,
  });

  return users;
};
