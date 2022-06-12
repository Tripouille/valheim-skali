import { useQuery, UseQueryResult } from 'react-query';
import axios from 'axios';
import { getUserRoles, User } from 'data/user';
import { SpecialRoleName } from 'data/role';
import useRoles from 'hooks/roles/useRoles';
import useSession from 'hooks/useSession';
import { APIRoute } from 'utils/routes';
import { QueryKeys, QueryTypes } from 'utils/queryClient';
import { PermissionCategory, userPrivilege } from 'utils/permissions';

export enum UserQueryFilter {
  MEMBER = 'member',
  NON_MEMBER = 'non_member',
}

export const getUsers = async (): Promise<User[]> => {
  const { data } = await axios.get<User[]>(APIRoute.USERS);

  return data;
};

export const useUsers = (filter: UserQueryFilter | false) => {
  const session = useSession();
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
    enabled: session.hasRequiredPermissions({
      [PermissionCategory.USER]: userPrivilege.READ,
    }),
    select: filterUsers,
  });

  let status = usersQuery.status;
  if (usersQuery.status === 'success' && (!roles || !filter)) status = 'loading';

  return { ...usersQuery, status } as UseQueryResult<User[]>;
};
