import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Application, WithDiscordInfos } from 'data/application';
import { QueryKeys } from 'utils/queryClient';
import { APIRoute } from 'utils/routes';

const getApplicationsOnServer = async (): Promise<WithDiscordInfos<Application>[]> => {
  const { data } = await axios.get<WithDiscordInfos<Application>[]>(APIRoute.APPLICATIONS);
  return data;
};

const useApplications = () => {
  const applicationsQuery = useQuery([QueryKeys.APPLICATIONS], getApplicationsOnServer);

  return applicationsQuery;
};

export default useApplications;
