import { useQuery, UseQueryResult } from 'react-query';
import axios from 'axios';
import { WikiPage } from 'data/wiki';
import { APIRoute } from 'utils/routes';
import { QueryKeys } from 'utils/queryClient';

const getWikiPages = async (): Promise<WikiPage[]> => {
  const { data } = await axios.get<WikiPage[]>(APIRoute.WIKI);
  return data;
};

const useWikiPages = (): UseQueryResult<WikiPage[]> => {
  const wikiProposalsQuery = useQuery(QueryKeys.WIKI, getWikiPages);

  return wikiProposalsQuery;
};

export default useWikiPages;
