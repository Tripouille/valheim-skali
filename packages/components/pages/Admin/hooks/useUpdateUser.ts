import { useCallback } from 'react';
import axios from 'axios';
import { User, UpdateUserData, UpdateUserRolesData } from '@packages/data/user';
import { Role } from '@packages/data/role';
import { APIRoute } from '@packages/utils/routes';
import { QueryKeys, QueryTypes } from '@packages/utils/queryClient';
import useOptimisticMutation from '@packages/utils/hooks/useOptimisticMutation';

const updateUserOnServer = (updatedUser: User) => async (updateUserData: UpdateUserData) => {
  await axios.patch(`${APIRoute.USERS}/${updatedUser._id}`, updateUserData);
};

enum AddOrRemoveAction {
  ADD = 'add',
  REMOVE = 'remove',
}

const addOrRemoveRoleToUserOnServer =
  (updatedUser: User, action: AddOrRemoveAction) => async (updateData: UpdateUserRolesData) => {
    await axios.patch(`${APIRoute.USERS}/${updatedUser._id}/roles/${action}`, updateData);
  };

const getUpdatedUsers = (
  previousUsers: QueryTypes[QueryKeys.USERS],
  updatedUser: User,
  newUserData: Partial<User>,
) =>
  previousUsers?.map(user => (user._id === updatedUser._id ? { ...user, ...newUserData } : user)) ??
  [];

const useUpdateUser = (updatedUser: User) => {
  const updateUserMutate = useOptimisticMutation<QueryKeys.USERS, UpdateUserData>(
    QueryKeys.USERS,
    updateUserOnServer(updatedUser),
    (previousUsers, updateUserData) => getUpdatedUsers(previousUsers, updatedUser, updateUserData),
    "L'utilisateur a bien été mis à jour.",
  );
  const addRoleToUserMutate = useOptimisticMutation<QueryKeys.USERS, UpdateUserRolesData>(
    QueryKeys.USERS,
    addOrRemoveRoleToUserOnServer(updatedUser, AddOrRemoveAction.ADD),
    (previousUsers, updateData) => {
      const oldUserRoles = updatedUser.roleIds ?? [];
      return getUpdatedUsers(previousUsers, updatedUser, {
        roleIds: [...oldUserRoles, updateData.roleId],
      });
    },
    "L'utilisateur a bien été mis à jour avec un nouveau rôle.",
  );
  const removeRoleFromUserMutate = useOptimisticMutation<QueryKeys.USERS, UpdateUserRolesData>(
    QueryKeys.USERS,
    addOrRemoveRoleToUserOnServer(updatedUser, AddOrRemoveAction.REMOVE),
    (previousUsers, updateData) => {
      const oldUserRoles = updatedUser.roleIds ?? [];
      return getUpdatedUsers(previousUsers, updatedUser, {
        roleIds: oldUserRoles.filter(roleId => roleId !== updateData.roleId),
      });
    },
    "L'utilisateur a bien été mis à jour sans le rôle.",
  );

  const updateUserNameInGame = useCallback(
    (newNameInGame: string) => {
      if (updatedUser.nameInGame === undefined || updatedUser.nameInGame !== newNameInGame)
        updateUserMutate({ nameInGame: newNameInGame });
    },
    [updateUserMutate, updatedUser],
  );
  const addRoleToUser = useCallback(
    (role: Role) => () => addRoleToUserMutate({ roleId: role._id }),
    [addRoleToUserMutate],
  );
  const removeRoleFromUser = useCallback(
    (role: Role) => () => removeRoleFromUserMutate({ roleId: role._id }),
    [removeRoleFromUserMutate],
  );

  return { updateUserNameInGame, removeRoleFromUser, addRoleToUser };
};

export default useUpdateUser;
