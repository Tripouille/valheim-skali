import { useQuery } from 'react-query';
import axios from 'axios';
import { compareRolesFromName, Role } from 'data/role';
import useSession from 'hooks/useSession';
import { APIRoute } from 'utils/routes';
import { QueryKeys } from 'utils/queryClient';
import { PermissionCategory, rolePrivilege } from 'utils/permissions';

const getRoles = async (): Promise<Role[]> => {
  const { data } = await axios.get<Role[]>(APIRoute.ROLES);
  return data;
};

const useRoles = () => {
  const session = useSession();

  const rolesQuery = useQuery(QueryKeys.ROLES, getRoles, {
    enabled: session.hasRequiredPermissions({
      [PermissionCategory.ROLE]: rolePrivilege.READ,
    }),
    select: data => data.sort(compareRolesFromName),
  });

  return rolesQuery;
};

export default useRoles;
