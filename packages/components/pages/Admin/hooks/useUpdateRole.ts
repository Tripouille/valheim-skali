import { useCallback } from 'react';
import { useQueryClient } from 'react-query';
import axios from 'axios';
import { Role, UpdateRoleData } from '@packages/data/role';
import { APIRoute } from '@packages/utils/routes';
import { QueryKeys, QueryTypes } from '@packages/utils/queryClient';
import useOptimisticMutation from '@packages/utils/hooks/useOptimisticMutation';
import { displayErrorToast } from '@packages/utils/toast';

const updateRoleOnServer = (updatedRole: Role) => async (updateRoleData: UpdateRoleData) => {
  await axios.put(`${APIRoute.ROLES}/${updatedRole._id}`, updateRoleData);
};

const useUpdateRole = (updatedRole: Role) => {
  const queryClient = useQueryClient();

  const updateRoleMutate = useOptimisticMutation<QueryKeys.ROLES, UpdateRoleData>(
    QueryKeys.ROLES,
    updateRoleOnServer(updatedRole),
    (previousRoles, updateRoleData) =>
      previousRoles?.map(role =>
        role._id === updatedRole._id ? { ...role, ...updateRoleData } : role,
      ) ?? [],
    'Le rôle a bien été mis à jour.',
    { onSettled: () => queryClient.invalidateQueries(QueryKeys.SESSION) },
  );

  const updateRole = useCallback(
    (roleData: UpdateRoleData) => {
      const roles = queryClient.getQueryData<QueryTypes[QueryKeys.ROLES]>(QueryKeys.ROLES);
      if (
        roles &&
        roles.some(role => role.name === roleData.name && role._id !== updatedRole._id)
      ) {
        displayErrorToast({ title: 'Erreur', description: 'Ce nom de rôle existe déjà.' });
        return;
      }
      updateRoleMutate(roleData);
    },
    [updateRoleMutate, queryClient, updatedRole],
  );

  return updateRole;
};

export default useUpdateRole;
