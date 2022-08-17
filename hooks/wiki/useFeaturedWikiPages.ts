import { QueryObserverSuccessResult, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { FeaturedWikiPages } from 'data/wiki';
import { APIRoute } from 'utils/routes';
import { QueryKeys } from 'utils/queryClient';

const getFeaturedWikiPagesFromServer = async (): Promise<FeaturedWikiPages> => {
  const { data } = await axios.get<FeaturedWikiPages>(`${APIRoute.WIKI}/featured`);
  return data;
};

const useFeaturedWikiPages = ({ placeholderData }: { placeholderData: FeaturedWikiPages }) => {
  const featuredWikiPagesQuery = useQuery(
    [QueryKeys.FEATURED_WIKI_PAGES],
    getFeaturedWikiPagesFromServer,
    { placeholderData },
  );

  // since initialData is provided, data can't be undefined
  // (fixed in v4 https://github.com/TanStack/query/pull/3834)
  return featuredWikiPagesQuery as QueryObserverSuccessResult<FeaturedWikiPages>;
};

export default useFeaturedWikiPages;
