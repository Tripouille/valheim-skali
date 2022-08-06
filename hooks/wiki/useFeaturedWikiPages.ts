import { QueryObserverSuccessResult, useQuery } from 'react-query';
import axios from 'axios';
import { FeaturedWikiPages } from 'data/wiki';
import { APIRoute } from 'utils/routes';
import { QueryKeys } from 'utils/queryClient';

const getFeaturedWikiPagesFromServer = async (): Promise<FeaturedWikiPages> => {
  const { data } = await axios.get<FeaturedWikiPages>(`${APIRoute.WIKI}/featured`);
  return data;
};

const useFeaturedWikiPages = ({ initialData }: { initialData: FeaturedWikiPages }) => {
  const featuredWikiPagesQuery = useQuery(
    QueryKeys.FEATURED_WIKI_PAGES,
    getFeaturedWikiPagesFromServer,
    { initialData: initialData },
  );

  // since initialData is provided, data can't be undefined
  // (fixed in v4 https://github.com/TanStack/query/pull/3834)
  return featuredWikiPagesQuery as QueryObserverSuccessResult<FeaturedWikiPages>;
};

export default useFeaturedWikiPages;
