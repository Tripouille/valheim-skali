import axios from 'axios';
import { QueryObserverSuccessResult, useQuery, UseQueryResult } from '@tanstack/react-query';
import { WikiPage } from 'data/wiki';
import { QueryKeys } from 'utils/queryClient';
import { APIRoute } from 'utils/routes';

const getWikiPage = (id?: string) => async (): Promise<WikiPage> => {
  const { data } = await axios.get<WikiPage>(`${APIRoute.WIKI}/${id}`);
  return data;
};

const useWikiPage = <T extends WikiPage | undefined>(id?: string, options?: { initialData: T }) => {
  const wikiPageQuery = useQuery([QueryKeys.WIKI_PAGES, id], getWikiPage(id), {
    enabled: typeof id === 'string',
    initialData: options?.initialData,
  });

  return wikiPageQuery as T extends undefined
    ? UseQueryResult<WikiPage>
    : QueryObserverSuccessResult<WikiPage>;
};

export default useWikiPage;
