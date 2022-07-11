import axios from 'axios';
import { useQuery, UseQueryResult } from 'react-query';
import { WikiPageInDb } from 'data/wiki';
import { APIRoute } from 'utils/routes';
import { QueryKeys } from 'utils/queryClient';

const findWikiPageOnServer = (searchString: string) => async (): Promise<WikiPageInDb[]> => {
  const { data } = await axios.post<WikiPageInDb[]>(`${APIRoute.WIKI}/find`, { searchString });
  return data;
};

const useFindWikiPage = (searchString: string): UseQueryResult<WikiPageInDb[]> => {
  const findWikiPageQuery = useQuery(
    [QueryKeys.FIND_WIKI_PAGE, searchString],
    findWikiPageOnServer(searchString),
    { enabled: searchString.length > 2 },
  );

  return findWikiPageQuery;
};

export default useFindWikiPage;
