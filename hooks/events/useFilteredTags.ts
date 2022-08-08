import { useCallback, useMemo } from 'react';
import useEvents from './useEvents';

const useFilteredTags = (chosenTags: string[], filter: string) => {
  const { data: events = [] } = useEvents();

  const compareTags = useCallback(
    (tag1: string, tag2: string) =>
      tag1.toLowerCase().indexOf(filter) < tag2.toLowerCase().indexOf(filter) ? -1 : 1,
    [filter],
  );

  const filteredTags = useMemo(() => {
    const allTags = [...new Set(events.flatMap(event => event.tags))];

    const lowerCaseFilter = filter.toLowerCase();
    const availableTagsWithEntry = allTags
      .filter(tag => tag.toLowerCase().includes(lowerCaseFilter) && !chosenTags.includes(tag))
      .sort(compareTags);

    return availableTagsWithEntry;
  }, [events, chosenTags, filter, compareTags]);

  return filteredTags;
};

export default useFilteredTags;
