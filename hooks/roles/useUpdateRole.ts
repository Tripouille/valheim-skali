import axios from 'axios';
import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { CreateRoleData, Role } from 'data/role';
import useOptimisticMutation from 'hooks/useOptimisticMutation';
import { QueryKeys, QueryTypes } from 'utils/queryClient';
import { APIRoute } from 'utils/routes';
import { displayErrorToast } from 'utils/toast';

const updateRoleOnServer = (updatedRole: Role) => async (newRole: CreateRoleData) => {
  await axios.put(`${APIRoute.ROLES}/${updatedRole._id}`, newRole);
};

const useUpdateRole = (updatedRole: Role) => {
  const queryClient = useQueryClient();

  const updateRoleMutate = useOptimisticMutation<QueryKeys.ROLES, CreateRoleData>(
    QueryKeys.ROLES,
    updateRoleOnServer(updatedRole),
    (previousRoles, newRole) =>
      previousRoles?.map(role =>
        role._id === updatedRole._id
          ? {
              ...role,
              ...{ ...newRole, _id: updatedRole._id },
            }
          : role,
      ) ?? [],
    'Le rôle a bien été mis à jour.',
    { onSettled: () => queryClient.invalidateQueries([QueryKeys.SESSION]) },
  );

  const updateRole = useCallback(
    (roleData: CreateRoleData) => {
      const roles = queryClient.getQueryData<QueryTypes[QueryKeys.ROLES]>([QueryKeys.ROLES]);
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
