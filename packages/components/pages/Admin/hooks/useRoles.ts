import { useQuery } from 'react-query';
import axios from 'axios';
import { Role } from '@packages/data/role';
import { APIRoute } from '@packages/utils/routes';
import { QueryKeys, QueryTypes } from '@packages/utils/queryClient';
import { useSession } from '@packages/utils/hooks/useSession';
import { PermissionCategory, PermissionPrivilege } from '@packages/utils/auth';

export const getRoles = async (): Promise<Role[]> => {
  const { data } = await axios.get<Role[]>(APIRoute.ROLES);
  return data;
};

export const useRoles = (): QueryTypes[QueryKeys.ROLES] => {
  const session = useSession();

  const fallback: QueryTypes[QueryKeys.ROLES] = [];
  const { data: roles = fallback } = useQuery(QueryKeys.ROLES, getRoles, {
    enabled: session.hasRequiredPermissions({
      [PermissionCategory.ROLE]: PermissionPrivilege.READ,
    }),
  });

  return roles;
};
