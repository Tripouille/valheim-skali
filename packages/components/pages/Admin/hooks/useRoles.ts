import { useQuery } from 'react-query';
import axios from 'axios';
import { compareRolesFromName, Role } from '@packages/data/role';
import { APIRoute } from '@packages/utils/routes';
import { QueryKeys } from '@packages/utils/queryClient';
import useSession from '@packages/utils/hooks/useSession';
import { PermissionCategory, PermissionPrivilege } from '@packages/utils/auth';

export const getRoles = async (): Promise<Role[]> => {
  const { data } = await axios.get<Role[]>(APIRoute.ROLES);
  return data;
};

export const useRoles = () => {
  const session = useSession();

  const rolesQuery = useQuery(QueryKeys.ROLES, getRoles, {
    enabled: session.hasRequiredPermissions({
      [PermissionCategory.ROLE]: PermissionPrivilege.READ,
    }),
    select: data => data.sort(compareRolesFromName),
  });

  return rolesQuery;
};
