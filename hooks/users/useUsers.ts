import axios from 'axios';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { SpecialRoleName } from 'data/role';
import { getUserRoles, User } from 'data/user';
import useRoles from 'hooks/roles/useRoles';
import { QueryKeys, QueryTypes } from 'utils/queryClient';
import { APIRoute } from 'utils/routes';

export enum UserQueryFilter {
  MEMBER = 'member',
  NON_MEMBER = 'non_member',
}

export const getUsers = async (): Promise<User[]> => {
  const { data } = await axios.get<User[]>(APIRoute.USERS);

  return data;
};

export const useUsers = (filter: UserQueryFilter | false): UseQueryResult<User[]> => {
  const { data: roles } = useRoles();

  const filterUsers = (allUsers: QueryTypes[QueryKeys.USERS]) => {
    if (!roles || !filter) return allUsers;
    const isMemberRequiredResult = filter === UserQueryFilter.MEMBER ? true : false;
    return allUsers.filter(user => {
      const userRoles = getUserRoles(user, roles);
      return (
        userRoles.some(role => role && role.name === SpecialRoleName.MEMBER) ===
        isMemberRequiredResult
      );
    });
  };

  const usersQuery = useQuery([QueryKeys.USERS], getUsers, {
    select: filterUsers,
  });

  if (filter !== false && usersQuery.status === 'success' && !roles)
    return { ...usersQuery, data: undefined, isLoading: true, isSuccess: false, status: 'loading' };

  return usersQuery;
};
