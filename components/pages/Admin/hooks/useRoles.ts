import { useQuery } from 'react-query';
import axios from 'axios';
import { compareRolesFromName, Role } from 'data/role';
import { APIRoute } from 'utils/routes';
import { QueryKeys } from 'utils/queryClient';
import useSession from 'utils/hooks/useSession';
import { PermissionCategory, PermissionPrivilege } from 'utils/auth';

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
