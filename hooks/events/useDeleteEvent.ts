import axios from 'axios';
import { Event, EventsPage } from 'data/event';
import useOptimisticMutation from 'hooks/useOptimisticMutation';
import { APIRoute } from 'utils/routes';
import { QueryKeys } from 'utils/queryClient';
import { InfiniteData } from '@tanstack/react-query';

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
