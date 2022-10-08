import axios from 'axios';
import { InfiniteData } from '@tanstack/react-query';
import { Event, EventsPage } from 'data/event';
import useOptimisticMutation from 'hooks/useOptimisticMutation';
import { QueryKeys } from 'utils/queryClient';
import { APIRoute } from 'utils/routes';

const deleteEventOnServer = (deletedEvent: Event) => async () => {
  await axios.delete(`${APIRoute.EVENTS}/${deletedEvent._id}`);
};

const getUpdatedEvents = (deletedEvent: Event) => (previousEvents: InfiniteData<EventsPage>) => ({
  pages: previousEvents.pages.map(eventsPage => ({
    ...eventsPage,
    events: eventsPage.events.filter(event => event._id !== deletedEvent._id),
  })),
  pageParams: previousEvents.pageParams,
});

const useDeleteEvent = (deletedEvent: Event) => {
  const deleteEvent = useOptimisticMutation(
    QueryKeys.EVENTS,
    deleteEventOnServer(deletedEvent),
    getUpdatedEvents(deletedEvent),
    "L'événement a bien été supprimé.",
  );

  return deleteEvent;
};

export default useDeleteEvent;
