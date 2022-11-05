import axios from 'axios';
import { useRouter } from 'next/router';
import { InfiniteData } from '@tanstack/react-query';
import { CreateEventData, getEventDataForServer, EventsPage } from 'data/event';
import useOptimisticMutation from 'hooks/useOptimisticMutation';
import { QueryKeys } from 'utils/queryClient';
import { APIRoute, getRoute, NavRoute } from 'utils/routes';

const updateEventOnServer = (updatedEventId?: string) => async (newEvent: CreateEventData) => {
  await axios.put(`${APIRoute.EVENTS}/${updatedEventId}`, getEventDataForServer(newEvent));
};

const getUpdatedEvents =
  (updatedEventId?: string) =>
  (previousEvents: InfiniteData<EventsPage>, newEvent: CreateEventData) => ({
    pages: previousEvents.pages.map(eventsPage => ({
      ...eventsPage,
      events: eventsPage.events.map(event =>
        event._id === updatedEventId ? { ...newEvent, _id: updatedEventId } : event,
      ),
    })),
    pageParams: previousEvents.pageParams,
  });

const useUpdateEvent = (updatedEventId?: string) => {
  const router = useRouter();

  const updateEvent = useOptimisticMutation<QueryKeys.EVENTS, CreateEventData>(
    QueryKeys.EVENTS,
    updateEventOnServer(updatedEventId),
    getUpdatedEvents(updatedEventId),
    "L'événement a bien été mis à jour.",
    { onSuccess: () => router.push(getRoute(`${NavRoute.EVENTS}?id=${updatedEventId}`)) },
  );

  return updateEvent;
};

export default useUpdateEvent;
