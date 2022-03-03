import axios from 'axios';
import { UseMutateFunction, useMutation, useQueryClient } from 'react-query';
import { UpdatedUserPartialData, User } from '@packages/data/user';
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

export const useUpdateUser = (
  updatedUser: User,
): UseMutateFunction<void, unknown, UpdatedUserPartialData, UserMutationContext> => {
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

  return updateUser;
};
