import { useCallback, useMemo } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { QueryKeys, QueryTypes } from 'utils/queryClient';

const useFilteredTags = (chosenTags: string[], filter: string) => {
  const queryClient = useQueryClient();
  const eventsData = queryClient.getQueryData<QueryTypes[QueryKeys.EVENTS]>([QueryKeys.EVENTS]);

  const compareTags = useCallback(
    (tag1: string, tag2: string) =>
      tag1.toLowerCase().indexOf(filter) < tag2.toLowerCase().indexOf(filter) ? -1 : 1,
    [filter],
  );

  const filteredTags = useMemo(() => {
    const allTags = eventsData?.pages[0]?.usedTags ?? [];

    const lowerCaseFilter = filter.toLowerCase();
    const availableTagsWithEntry = allTags
      .filter(tag => tag.toLowerCase().includes(lowerCaseFilter) && !chosenTags.includes(tag))
      .sort(compareTags);

    return availableTagsWithEntry;
  }, [eventsData?.pages, filter, compareTags, chosenTags]);

  return filteredTags;
};

export default useFilteredTags;
