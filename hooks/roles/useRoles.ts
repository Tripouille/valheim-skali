import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { compareRolesFromName, Role } from 'data/role';
import useSession from 'hooks/useSession';
import { PermissionCategory, rolePrivilege } from 'utils/permissions';
import { QueryKeys } from 'utils/queryClient';
import { APIRoute } from 'utils/routes';

const getRoles = async (): Promise<Role[]> => {
  const { data } = await axios.get<Role[]>(APIRoute.ROLES);
  return data;
};

const useRoles = () => {
  const session = useSession();

  const rolesQuery = useQuery([QueryKeys.ROLES], getRoles, {
    enabled: session.hasRequiredPermissions({
      [PermissionCategory.ROLE]: rolePrivilege.READ,
    }),
    select: data => data.sort(compareRolesFromName),
  });

  return rolesQuery;
};

export default useRoles;
