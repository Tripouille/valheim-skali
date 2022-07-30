import axios from 'axios';
import { useQuery, UseQueryResult } from 'react-query';
import { WikiPage } from 'data/wiki';
import { APIRoute } from 'utils/routes';
import { QueryKeys } from 'utils/queryClient';

const findWikiPageOnServer = (searchString: string) => async (): Promise<WikiPage[]> => {
  const { data } = await axios.post<WikiPage[]>(`${APIRoute.WIKI}/find`, { searchString });
  return data;
};

const useFindWikiPages = (
  searchString: string,
  minLengthToEnable = 1,
): UseQueryResult<WikiPage[]> => {
  const findWikiPageQuery = useQuery(
    [QueryKeys.FIND_WIKI_PAGE, searchString],
    findWikiPageOnServer(searchString),
    { enabled: searchString.length >= minLengthToEnable && searchString.trim().length > 0 },
  );

  return findWikiPageQuery;
};

export default useFindWikiPages;
