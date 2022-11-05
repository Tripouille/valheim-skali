import axios from 'axios';
import { useRouter } from 'next/router';
import { InfiniteData } from '@tanstack/react-query';
import { EventsPage } from 'data/event';
import useOptimisticMutation from 'hooks/useOptimisticMutation';
import { QueryKeys } from 'utils/queryClient';
import { APIRoute, getRoute, NavRoute } from 'utils/routes';

const deleteEventOnServer = (deletedEventId?: string) => async () => {
  await axios.delete(`${APIRoute.EVENTS}/${deletedEventId}`);
};

const getUpdatedEvents =
  (deletedEventId?: string) => (previousEvents: InfiniteData<EventsPage>) => ({
    pages: previousEvents.pages.map(eventsPage => ({
      ...eventsPage,
      events: eventsPage.events.filter(event => event._id !== deletedEventId),
    })),
    pageParams: previousEvents.pageParams,
  });

const useDeleteEvent = (deletedEventId?: string) => {
  const router = useRouter();

  const deleteEvent = useOptimisticMutation(
    QueryKeys.EVENTS,
    deleteEventOnServer(deletedEventId),
    getUpdatedEvents(deletedEventId),
    "L'événement a bien été supprimé.",
    { onSuccess: () => router.push(getRoute(NavRoute.EVENTS)) },
  );

  return deleteEvent;
};

export default useDeleteEvent;
