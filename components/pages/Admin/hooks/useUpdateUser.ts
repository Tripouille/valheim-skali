import { useCallback } from 'react';
import { useQueryClient } from 'react-query';
import axios from 'axios';
import { User, UpdateUserData, UpdateUserRolesData } from 'data/user';
import { Role } from 'data/role';
import { APIRoute } from 'utils/routes';
import { QueryKeys, QueryTypes } from 'utils/queryClient';
import useSession from 'utils/hooks/useSession';
import useOptimisticMutation from 'utils/hooks/useOptimisticMutation';

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
  const queryClient = useQueryClient();
  const session = useSession();

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
    {
      onSettled: () => {
        /** If I update my own roles, my permissions may have changed */
        if (updatedUser._id === session.data?.user._id) {
          queryClient.invalidateQueries(QueryKeys.SESSION);
        }
      },
    },
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
    {
      onSettled: () => {
        /** If I update my own roles, my permissions may have changed */
        if (updatedUser._id === session.data?.user._id) {
          queryClient.invalidateQueries(QueryKeys.SESSION);
        }
      },
    },
  );

  const updateUserNameInGame = useCallback(
    (newNameInGame: string) => {
      const nameInGameHasChanged =
        updatedUser.nameInGame !== newNameInGame &&
        (newNameInGame.length || updatedUser.nameInGame?.length);
      if (nameInGameHasChanged) updateUserMutate({ nameInGame: newNameInGame });
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
