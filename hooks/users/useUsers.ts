import { useQuery, UseQueryResult } from 'react-query';
import axios from 'axios';
import { getUserRoles, User } from 'data/user';
import { SpecialRoleName } from 'data/role';
import useRoles from 'hooks/roles/useRoles';
import { APIRoute } from 'utils/routes';
import { QueryKeys, QueryTypes } from 'utils/queryClient';

export enum UserQueryFilter {
  MEMBER = 'member',
  NON_MEMBER = 'non_member',
}

export const getUsers = async (): Promise<User[]> => {
  const { data } = await axios.get<User[]>(APIRoute.USERS);

  return data;
};

export const useUsers = (filter: UserQueryFilter | false) => {
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

  const usersQuery = useQuery(QueryKeys.USERS, getUsers, {
    select: filterUsers,
  });

  if (filter !== false && usersQuery.status === 'success' && !roles)
    (usersQuery as UseQueryResult<User[]>).status = 'loading';

  return usersQuery;
};
