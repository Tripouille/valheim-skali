import { useCallback, useMemo } from 'react';
import useInfiniteEvents from './useInfiniteEvents';

const useFilteredTags = (chosenTags: string[], filter: string) => {
  const { data: eventsData } = useInfiniteEvents();

  const compareTags = useCallback(
    (tag1: string, tag2: string) =>
      tag1.toLowerCase().indexOf(filter) < tag2.toLowerCase().indexOf(filter) ? -1 : 1,
    [filter],
  );

  const filteredTags = useMemo(() => {
    const allTags = eventsData?.pages[0].usedTags ?? [];

    const lowerCaseFilter = filter.toLowerCase();
    const availableTagsWithEntry = allTags
      .filter(tag => tag.toLowerCase().includes(lowerCaseFilter) && !chosenTags.includes(tag))
      .sort(compareTags);

    return availableTagsWithEntry;
  }, [eventsData?.pages, filter, compareTags, chosenTags]);

  return filteredTags;
};

export default useFilteredTags;
