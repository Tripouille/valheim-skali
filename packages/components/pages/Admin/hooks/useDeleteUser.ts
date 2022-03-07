import { useCallback } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { User } from '@packages/data/user';
import { APIRoute } from '@packages/utils/routes';
import { QueryKeys, QueryTypes } from '@packages/utils/queryClient';
import { displayErrorToast, displaySuccessToast } from '@packages/utils/toast';
import { getMessageFromError } from '@packages/utils/error';

interface UserMutationContext {
  previousUsers?: QueryTypes[QueryKeys.USERS];
}

const deleteUserOnServer = (deletedUser: User) => async () => {
  await axios.delete(`${APIRoute.USERS}/${deletedUser._id}`);
};

const getUpdatedUsers = (previousUsers: QueryTypes[QueryKeys.USERS], deletedUser: User) =>
  previousUsers?.filter(user => user._id !== deletedUser._id) ?? [];

const useDeleteUser = (deletedUser: User) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(deleteUserOnServer(deletedUser), {
    onMutate: () => {
      queryClient.cancelQueries(QueryKeys.USERS);
      const previousUsers =
        queryClient.getQueryData<QueryTypes[QueryKeys.USERS]>(QueryKeys.USERS) ?? [];
      queryClient.setQueryData<QueryTypes[QueryKeys.USERS]>(
        QueryKeys.USERS,
        getUpdatedUsers(previousUsers, deletedUser),
      );
      return { previousUsers };
    },
    onError: (error: unknown, variables: void, context?: UserMutationContext) => {
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
    onSuccess: () => displaySuccessToast({ title: "L'utilisateur a bien été supprimé." }),
    onSettled: () => queryClient.invalidateQueries(QueryKeys.USERS),
  });

  const deleteUser = useCallback(() => mutate(), [mutate]);

  return deleteUser;
};

export default useDeleteUser;
