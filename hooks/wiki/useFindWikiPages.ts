import axios from 'axios';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { WikiPage } from 'data/wiki';
import { APIRoute } from 'utils/routes';
import { QueryKeys } from 'utils/queryClient';
import { sendGoogleTagManagerCustomEvent } from 'utils/googleTagManager';

const findWikiPageOnServer = (searchString: string) => async (): Promise<WikiPage[]> => {
  sendGoogleTagManagerCustomEvent('search_wiki_page', { search_term: searchString });
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
