import { useCallback } from 'react';
import { UseMutationOptions, useQueryClient } from 'react-query';
import axios from 'axios';
import { CreateRoleData } from '@packages/data/role';
import { APIRoute } from '@packages/utils/routes';
import { QueryKeys, QueryTypes } from '@packages/utils/queryClient';
import useOptimisticMutation from '@packages/utils/hooks/useOptimisticMutation';
import { displayErrorToast } from '@packages/utils/toast';

const createRoleOnServer = async (roleData: CreateRoleData) => {
  await axios.post(`${APIRoute.ROLES}`, roleData);
};

const useCreateRole = (
  onSuccess: UseMutationOptions<void, unknown, CreateRoleData>['onSuccess'],
) => {
  const queryClient = useQueryClient();

  const createRoleMutate = useOptimisticMutation<QueryKeys.ROLES, CreateRoleData>(
    QueryKeys.ROLES,
    createRoleOnServer,
    (previousRoles, roleData) => [...(previousRoles ?? []), { ...roleData, _id: 'new' }],
    'Le rôle a bien été créé.',
    { onSuccess },
  );

  const createRole = useCallback(
    (roleData: CreateRoleData) => {
      const roles = queryClient.getQueryData<QueryTypes[QueryKeys.ROLES]>(QueryKeys.ROLES);
      if (roles && roles.some(role => role.name === roleData.name)) {
        displayErrorToast({ title: 'Erreur', description: 'Ce nom de rôle existe déjà.' });
        return;
      }
      createRoleMutate(roleData);
    },
    [createRoleMutate, queryClient],
  );

  return createRole;
};

export default useCreateRole;
