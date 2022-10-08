import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { ApplicationAssociableUser } from 'data/application';
import { QueryKeys } from 'utils/queryClient';
import { APIRoute } from 'utils/routes';

const getApplicationAssociableUsersOnServer = async (): Promise<ApplicationAssociableUser[]> => {
  const { data } = await axios.get<ApplicationAssociableUser[]>(
    APIRoute.APPLICATION_ASSOCIABLE_USERS,
  );
  return data;
};

const useApplicationAssociableUsers = (applicationUserId?: string) => {
  const applicationAssociableUsersQuery = useQuery(
    [QueryKeys.APPLICATION_ASSOCIABLE_USERS],
    getApplicationAssociableUsersOnServer,
    {
      select: users =>
        users.filter(
          user => (!user.isMember && !user.applicationId) || user._id === applicationUserId,
        ),
    },
  );

  return applicationAssociableUsersQuery;
};

export default useApplicationAssociableUsers;
