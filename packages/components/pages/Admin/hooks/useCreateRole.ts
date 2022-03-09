import { UseMutationOptions } from 'react-query';
import axios from 'axios';
import { CreateRoleData } from '@packages/data/role';
import { APIRoute } from '@packages/utils/routes';
import { QueryKeys } from '@packages/utils/queryClient';
import useOptimisticMutation from '@packages/utils/hooks/useOptimisticMutation';

const createRoleOnServer = async (roleData: CreateRoleData) => {
  await axios.post(`${APIRoute.ROLES}`, roleData);
};

const useCreateRole = (
  onSuccess: UseMutationOptions<void, unknown, CreateRoleData>['onSuccess'],
) => {
  const createRole = useOptimisticMutation<QueryKeys.ROLES, CreateRoleData>(
    QueryKeys.ROLES,
    createRoleOnServer,
    (previousRoles, roleData) => [...(previousRoles ?? []), { ...roleData, _id: 'new' }],
    'Le rôle a bien été créé.',
    { onSuccess },
  );

  return createRole;
};

export default useCreateRole;
