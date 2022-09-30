import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ApplicationAssociableUser } from 'data/application';
import { APIRoute } from 'utils/routes';
import { QueryKeys } from 'utils/queryClient';

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
