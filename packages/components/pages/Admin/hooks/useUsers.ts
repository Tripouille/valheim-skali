import { useCallback } from 'react';
import { useQuery, UseQueryResult } from 'react-query';
import axios from 'axios';
import { User } from '@packages/data/user';
import { APIRoute } from '@packages/utils/routes';
import { QueryKeys, QueryTypes } from '@packages/utils/queryClient';
import useSession from '@packages/utils/hooks/useSession';
import { PermissionCategory, PermissionPrivilege, SpecialRoleName } from '@packages/utils/auth';
import { getUserRoles, UserQueryFilter } from '../utils';
import { useRoles } from './useRoles';

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
  const roles = useRoles();

  const filterUsers = useCallback(
    (allUsers: QueryTypes[QueryKeys.USERS]) => {
      if (!roles) return allUsers;
      const isMemberRequiredResult = filter === UserQueryFilter.MEMBER ? true : false;
      return allUsers.filter(user => {
        const userRoles = getUserRoles(user, roles);
        return (
          userRoles.some(role => role && role.name === SpecialRoleName.MEMBER) ===
          isMemberRequiredResult
        );
      });
    },
    [filter, roles],
  );

  const usersQuery = useQuery(QueryKeys.USERS, getUsers, {
    enabled: session.hasRequiredPermissions({
      [PermissionCategory.USER]: PermissionPrivilege.READ,
    }),
    select: filterUsers,
  });

  return usersQuery;
};
