import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Application, WithDiscordInfos } from 'data/application';
import { QueryKeys } from 'utils/queryClient';
import { APIRoute } from 'utils/routes';

const getMyApplicationOnServer = async (): Promise<WithDiscordInfos<Application>> => {
  const { data } = await axios.get<WithDiscordInfos<Application>>(APIRoute.MY_APPLICATION);
  return data;
};

const useMyApplication = () => {
  const myApplicationQuery = useQuery([QueryKeys.MY_APPLICATION], getMyApplicationOnServer);

  return myApplicationQuery;
};

export default useMyApplication;
