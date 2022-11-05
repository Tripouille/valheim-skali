import axios from 'axios';
import { InfiniteData, useQuery } from '@tanstack/react-query';
import { Event, EventsPage } from 'data/event';
import { queryClient, QueryKeys } from 'utils/queryClient';
import { APIRoute } from 'utils/routes';

const getEventFromServer = (id?: string) => async (): Promise<Event> => {
  const { data } = await axios.get<Event>(`${APIRoute.EVENTS}/${id}`);
  return data;
};

const useEvent = (id?: string) => {
  const wikiProposalQuery = useQuery([QueryKeys.EVENTS, id], getEventFromServer(id), {
    enabled: typeof id === 'string',
    placeholderData: () => {
      let event: Event | undefined;
      const events: InfiniteData<EventsPage<Event>> | undefined = queryClient.getQueryData([
        QueryKeys.EVENTS,
      ]);
      console.log({ events });
      events?.pages.forEach(eventsPage => {
        event = eventsPage.events.find(e => e._id === id) ?? event;
      });
      return event;
    },
  });

  return wikiProposalQuery;
};

export default useEvent;
