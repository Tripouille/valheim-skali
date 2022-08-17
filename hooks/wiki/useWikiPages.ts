import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';
import { WikiPage } from 'data/wiki';
import { APIRoute } from 'utils/routes';
import { QueryKeys } from 'utils/queryClient';

const getWikiPages = async (): Promise<WikiPage[]> => {
  const { data } = await axios.get<WikiPage[]>(APIRoute.WIKI);
  return data;
};

const useWikiPages = (): UseQueryResult<WikiPage[]> => {
  const wikiPagesQuery = useQuery([QueryKeys.WIKI_PAGES], getWikiPages, { staleTime: 0 });

  return wikiPagesQuery;
};

export default useWikiPages;
