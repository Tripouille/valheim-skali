import { useCallback } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { UpdatedUserPartialData, User } from '@packages/data/user';
import { Role } from '@packages/data/role';
import { APIRoute } from '@packages/utils/routes';
import { queryErrorHandler, QueryKeys, QueryTypes } from '@packages/utils/queryClient';
import { displaySuccessToast } from '@packages/utils/toast';

interface UserMutationContext {
  previousUsers?: QueryTypes[QueryKeys.USERS];
}

const updateUserOnServer =
  (updatedUser: User) => async (updatedUserPartialData: UpdatedUserPartialData) => {
    await axios.put(`${APIRoute.USERS}/${updatedUser._id}`, updatedUserPartialData);
  };

const getUpdatedUsers = (
  previousUsers: QueryTypes[QueryKeys.USERS],
  updatedUser: User,
  updatedUserPartialData: UpdatedUserPartialData,
) =>
  previousUsers?.map(user =>
    user._id === updatedUser._id ? { ...user, ...updatedUserPartialData } : user,
  ) ?? [];

export const useUpdateUser = (updatedUser: User) => {
  const queryClient = useQueryClient();

  const { mutate: updateUser } = useMutation<
    void,
    unknown,
    UpdatedUserPartialData,
    UserMutationContext
  >(updateUserOnServer(updatedUser), {
    onMutate: async updatedUserPartialData => {
      queryClient.cancelQueries(QueryKeys.USERS);
      const previousUsers =
        queryClient.getQueryData<QueryTypes[QueryKeys.USERS]>(QueryKeys.USERS) ?? [];
      queryClient.setQueryData<QueryTypes[QueryKeys.USERS]>(
        QueryKeys.USERS,
        getUpdatedUsers(previousUsers, updatedUser, updatedUserPartialData),
      );
      return { previousUsers };
    },
    onError: (error, updatedUserPartialData, context) => {
      if (context?.previousUsers) {
        queryClient.setQueryData<QueryTypes[QueryKeys.USERS]>(
          QueryKeys.USERS,
          context.previousUsers,
        );
      }
      queryErrorHandler(error);
    },
    onSuccess: () => {
      displaySuccessToast({ title: "L'utilisateur a bien été mis à jour." });
    },
    onSettled: () => {
      queryClient.invalidateQueries(QueryKeys.USERS);
    },
  });

  const updateUserNameInGame = useCallback(
    (newNameInGame: string) => updateUser({ nameInGame: newNameInGame }),
    [updateUser],
  );

  const removeRoleFromUser = useCallback(
    (removedRole: Role) => () => {
      if ('roleIds' in updatedUser)
        updateUser({ roleIds: updatedUser.roleIds.filter(roleId => roleId !== removedRole._id) });
    },
    [updateUser, updatedUser],
  );

  const addRoleToUser = useCallback(
    (addedRole: Role) => () => {
      updateUser({
        roleIds: [...('roleIds' in updatedUser ? updatedUser.roleIds : []), addedRole._id],
      });
    },
    [updateUser, updatedUser],
  );

  return { updateUserNameInGame, removeRoleFromUser, addRoleToUser };
};
