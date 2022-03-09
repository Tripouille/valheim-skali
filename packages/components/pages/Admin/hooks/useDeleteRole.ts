import { useCallback } from 'react';
import axios from 'axios';
import { Role } from '@packages/data/role';
import { APIRoute } from '@packages/utils/routes';
import { QueryKeys, QueryTypes } from '@packages/utils/queryClient';
import useOptimisticMutation from '@packages/utils/hooks/useOptimisticMutation';

const deleteRoleOnServer = (deletedRole: Role) => async () => {
  await axios.delete(`${APIRoute.ROLES}/${deletedRole._id}`);
};

const getUpdatedRoles = (deletedRole: Role) => (previousRoles: QueryTypes[QueryKeys.ROLES]) =>
  previousRoles?.filter(role => role._id !== deletedRole._id) ?? [];

const useDeleteRole = (deletedRole: Role) => {
  const mutate = useOptimisticMutation(
    QueryKeys.ROLES,
    deleteRoleOnServer(deletedRole),
    getUpdatedRoles(deletedRole),
    'Le rôle a bien été supprimé.',
  );

  const deleteRole = useCallback(() => mutate(), [mutate]);

  return deleteRole;
};

export default useDeleteRole;
