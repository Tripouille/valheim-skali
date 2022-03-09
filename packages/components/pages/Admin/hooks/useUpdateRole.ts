import { useQueryClient } from 'react-query';
import axios from 'axios';
import { Role, UpdateRoleData } from '@packages/data/role';
import { APIRoute } from '@packages/utils/routes';
import { QueryKeys } from '@packages/utils/queryClient';
import useOptimisticMutation from '@packages/utils/hooks/useOptimisticMutation';

const updateRoleOnServer = (updatedRole: Role) => async (updateRoleData: UpdateRoleData) => {
  await axios.put(`${APIRoute.ROLES}/${updatedRole._id}`, updateRoleData);
};

const useUpdateRole = (updatedRole: Role) => {
  const queryClient = useQueryClient();

  const updateRole = useOptimisticMutation<QueryKeys.ROLES, UpdateRoleData>(
    QueryKeys.ROLES,
    updateRoleOnServer(updatedRole),
    (previousRoles, updateRoleData) =>
      previousRoles?.map(role =>
        role._id === updatedRole._id ? { ...role, ...updateRoleData } : role,
      ) ?? [],
    'Le rôle a bien été mis à jour.',
    { onSettled: () => queryClient.invalidateQueries(QueryKeys.SESSION) },
  );

  return updateRole;
};

export default useUpdateRole;
