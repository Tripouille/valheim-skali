import axios from 'axios';
import { useCallback } from 'react';
import { Role } from 'data/role';
import useOptimisticMutation from 'hooks/useOptimisticMutation';
import { useUsers } from 'hooks/users/useUsers';
import { QueryKeys, QueryTypes } from 'utils/queryClient';
import { APIRoute } from 'utils/routes';
import { displayErrorToast } from 'utils/toast';

const deleteRoleOnServer = (deletedRole: Role) => async () => {
  await axios.delete(`${APIRoute.ROLES}/${deletedRole._id}`);
};

const getUpdatedRoles = (deletedRole: Role) => (previousRoles: QueryTypes[QueryKeys.ROLES]) =>
  previousRoles?.filter(role => role._id !== deletedRole._id) ?? [];

const useDeleteRole = (deletedRole: Role) => {
  const usersQuery = useUsers(false);

  const deleteRoleMutate = useOptimisticMutation(
    QueryKeys.ROLES,
    deleteRoleOnServer(deletedRole),
    getUpdatedRoles(deletedRole),
    'Le rôle a bien été supprimé.',
  );

  const deleteRole = useCallback(() => {
    if (usersQuery.data?.some(user => user.roleIds?.includes(deletedRole._id))) {
      displayErrorToast({ title: 'Erreur', description: 'Un utilisateur possède ce rôle.' });
      return;
    }
    deleteRoleMutate();
  }, [deleteRoleMutate, deletedRole, usersQuery.data]);

  return deleteRole;
};

export default useDeleteRole;
