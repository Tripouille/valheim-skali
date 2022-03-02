import axios from 'axios';
import { UseMutateFunction, useMutation, useQueryClient } from 'react-query';
import { User } from '@packages/data/user';
import { APIRoute } from '@packages/utils/routes';
import { QueryKeys, QueryTypes } from '@packages/utils/queryClient';

interface PatchUserData {
  nameInGame: string;
}

interface UserMutationContext {
  previousUsers?: QueryTypes[QueryKeys.USERS];
}

const patchUserOnServer = (patchedUser: User) => async (patchData: PatchUserData) => {
  await axios.patch(`${APIRoute.USERS}/${patchedUser._id}`, patchData);
};

const getPatchedUsers = (
  previousUsers: QueryTypes[QueryKeys.USERS],
  patchedUser: User,
  patchData: PatchUserData,
) =>
  previousUsers?.map(user => (user._id === patchedUser._id ? { ...user, ...patchData } : user)) ??
  [];

export const usePatchUser = (
  patchedUser: User,
): UseMutateFunction<void, unknown, PatchUserData, UserMutationContext> => {
  const queryClient = useQueryClient();

  const { mutate: patchUser } = useMutation<void, unknown, PatchUserData, UserMutationContext>(
    patchUserOnServer(patchedUser),
    {
      onMutate: async patchData => {
        queryClient.cancelQueries(QueryKeys.USERS);
        const previousUsers =
          queryClient.getQueryData<QueryTypes[QueryKeys.USERS]>(QueryKeys.USERS) ?? [];
        queryClient.setQueryData<QueryTypes[QueryKeys.USERS]>(
          QueryKeys.USERS,
          getPatchedUsers(previousUsers, patchedUser, patchData),
        );
        return { previousUsers };
      },
      onError: (error, patchData, context) => {
        if (context?.previousUsers) {
          queryClient.setQueryData<QueryTypes[QueryKeys.USERS]>(
            QueryKeys.USERS,
            context.previousUsers,
          );
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries(QueryKeys.USERS);
      },
    },
  );

  return patchUser;
};
