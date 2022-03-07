import { useCallback } from 'react';
import axios from 'axios';
import { User } from '@packages/data/user';
import { APIRoute } from '@packages/utils/routes';
import { QueryKeys, QueryTypes } from '@packages/utils/queryClient';
import useOptimisticMutation from '@packages/utils/hooks/useOptimisticMutation';

const deleteUserOnServer = (deletedUser: User) => async () => {
  await axios.delete(`${APIRoute.USERS}/${deletedUser._id}`);
};

const getUpdatedUsers = (deletedUser: User) => (previousUsers: QueryTypes[QueryKeys.USERS]) =>
  previousUsers?.filter(user => user._id !== deletedUser._id) ?? [];

const useDeleteUser = (deletedUser: User) => {
  const mutate = useOptimisticMutation(
    QueryKeys.USERS,
    deleteUserOnServer(deletedUser),
    getUpdatedUsers(deletedUser),
    "L'utilisateur a bien été supprimé.",
  );

  const deleteUser = useCallback(() => mutate(), [mutate]);

  return deleteUser;
};

export default useDeleteUser;
