import axios from 'axios';
import { useQuery, UseQueryResult } from 'react-query';
import { WikiPage } from 'data/wiki';
import { APIRoute } from 'utils/routes';
import { QueryKeys } from 'utils/queryClient';

const getWikiPage = (id?: string) => async (): Promise<WikiPage> => {
  const { data } = await axios.get<WikiPage>(`${APIRoute.WIKI}/${id}`);
  return data;
};

const useWikiPage = (id?: string): UseQueryResult<WikiPage> => {
  const wikiPageQuery = useQuery([QueryKeys.WIKI, id], getWikiPage(id), {
    enabled: typeof id === 'string',
  });

  return wikiPageQuery;
};

export default useWikiPage;
