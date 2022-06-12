import axios from 'axios';
import { User } from 'data/user';
import useOptimisticMutation from 'hooks/useOptimisticMutation';
import { APIRoute } from 'utils/routes';
import { QueryKeys, QueryTypes } from 'utils/queryClient';

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

  return mutate;
};

export default useDeleteUser;
