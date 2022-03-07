import { useCallback } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { User, UpdateUserData, UpdateUserRolesData } from '@packages/data/user';
import { APIRoute } from '@packages/utils/routes';
import { QueryKeys, QueryTypes } from '@packages/utils/queryClient';
import { displayErrorToast, displaySuccessToast } from '@packages/utils/toast';
import { Role } from '@packages/data/role';
import { getMessageFromError } from '@packages/utils/error';

interface UserMutationContext {
  previousUsers?: QueryTypes[QueryKeys.USERS];
}
type UserPatchData = UpdateUserData | UpdateUserRolesData;

const updateUserOnServer = (updatedUser: User) => async (updateUserData: UpdateUserData) => {
  await axios.patch(`${APIRoute.USERS}/${updatedUser._id}`, updateUserData);
};

const addRoleToUserOnServer = (updatedUser: User) => async (updateData: UpdateUserRolesData) => {
  await axios.patch(`${APIRoute.USERS}/${updatedUser._id}/roles/add`, updateData);
};

const removeRoleFromUserOnServer =
  (updatedUser: User) => async (updateData: UpdateUserRolesData) => {
    await axios.patch(`${APIRoute.USERS}/${updatedUser._id}/roles/remove`, updateData);
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

  const onMutate =
    <T extends UserPatchData>(getNewUserData: (updateData: T) => Partial<User>) =>
    async (updateData: T) => {
      queryClient.cancelQueries(QueryKeys.USERS);
      const previousUsers =
        queryClient.getQueryData<QueryTypes[QueryKeys.USERS]>(QueryKeys.USERS) ?? [];
      queryClient.setQueryData<QueryTypes[QueryKeys.USERS]>(
        QueryKeys.USERS,
        getUpdatedUsers(previousUsers, updatedUser, getNewUserData(updateData)),
      );
      return { previousUsers };
    };
  const onError = useCallback(
    (error: unknown, updateData: UserPatchData, context?: UserMutationContext) => {
      if (context?.previousUsers) {
        queryClient.setQueryData<QueryTypes[QueryKeys.USERS]>(
          QueryKeys.USERS,
          context.previousUsers,
        );
      }
      displayErrorToast({
        title: getMessageFromError(error),
        description: 'Les changements ont été annulés.',
      });
    },
    [queryClient],
  );
  const onSuccess = () => displaySuccessToast({ title: "L'utilisateur a bien été mis à jour." });
  const onSettled = () => queryClient.invalidateQueries(QueryKeys.USERS);

  const { mutate: updateUser } = useMutation(updateUserOnServer(updatedUser), {
    onMutate: onMutate<UpdateUserData>(updateUserData => updateUserData),
    onError,
    onSuccess,
    onSettled,
  });

  const { mutate: addRoleToUserMutate } = useMutation(addRoleToUserOnServer(updatedUser), {
    onMutate: onMutate<UpdateUserRolesData>(updateData => {
      const oldUserRoles = updatedUser.roleIds ? updatedUser.roleIds : [];
      return {
        roleIds: [...oldUserRoles, updateData.roleId],
      };
    }),
    onError,
    onSuccess,
    onSettled,
  });

  const { mutate: removeRoleFromUserMutate } = useMutation(
    removeRoleFromUserOnServer(updatedUser),
    {
      onMutate: onMutate<UpdateUserRolesData>(updateData => {
        const oldUserRoles = updatedUser.roleIds ? updatedUser.roleIds : [];
        return {
          roleIds: oldUserRoles.filter(roleId => roleId !== updateData.roleId),
        };
      }),
      onError,
      onSuccess,
      onSettled,
    },
  );

  const updateUserNameInGame = useCallback(
    (newNameInGame: string) => {
      if (updatedUser.nameInGame === undefined || updatedUser.nameInGame !== newNameInGame)
        updateUser({ nameInGame: newNameInGame });
    },
    [updateUser, updatedUser],
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
