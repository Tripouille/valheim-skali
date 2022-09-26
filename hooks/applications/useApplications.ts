import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Application, WithDiscordInfos } from 'data/application';
import { APIRoute } from 'utils/routes';
import { QueryKeys } from 'utils/queryClient';

const getApplicationsOnServer = async (): Promise<WithDiscordInfos<Application>[]> => {
  const { data } = await axios.get<WithDiscordInfos<Application>[]>(APIRoute.APPLICATIONS);
  return data;
};

const useApplications = () => {
  const applicationsQuery = useQuery([QueryKeys.APPLICATIONS], getApplicationsOnServer);

  return applicationsQuery;
};

export default useApplications;
