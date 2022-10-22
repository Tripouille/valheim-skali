import axios from 'axios';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { WikiPage } from 'data/wiki';
import { QueryKeys } from 'utils/queryClient';
import { APIRoute } from 'utils/routes';

const getWikiPages = async (): Promise<WikiPage[]> => {
  const { data } = await axios.get<WikiPage[]>(APIRoute.WIKI);
  return data;
};

const useWikiPages = (): UseQueryResult<WikiPage[]> => {
  const wikiPagesQuery = useQuery([QueryKeys.WIKI_PAGES], getWikiPages, { staleTime: 0 });

  return wikiPagesQuery;
};

export default useWikiPages;
