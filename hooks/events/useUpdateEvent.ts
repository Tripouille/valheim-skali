import axios from 'axios';
import { InfiniteData } from '@tanstack/react-query';
import { Event, CreateEventData, getEventDataForServer, EventsPage } from 'data/event';
import useOptimisticMutation from 'hooks/useOptimisticMutation';
import { APIRoute } from 'utils/routes';
import { QueryKeys } from 'utils/queryClient';

const updateEventOnServer = (updatedEvent: Event) => async (newEvent: CreateEventData) => {
  await axios.put(`${APIRoute.EVENTS}/${updatedEvent._id}`, getEventDataForServer(newEvent));
};

const getUpdatedEvents =
  (updatedEvent: Event) =>
  (previousEvents: InfiniteData<EventsPage>, newEvent: CreateEventData) => ({
    pages: previousEvents.pages.map(eventsPage => ({
      ...eventsPage,
      events: eventsPage.events.map(event =>
        event._id === updatedEvent._id ? { ...newEvent, _id: updatedEvent._id } : event,
      ),
    })),
    pageParams: previousEvents.pageParams,
  });

const useUpdateEvent = (updatedEvent: Event) => {
  const updateEvent = useOptimisticMutation<QueryKeys.EVENTS, CreateEventData>(
    QueryKeys.EVENTS,
    updateEventOnServer(updatedEvent),
    getUpdatedEvents(updatedEvent),
    "L'événement a bien été mis à jour.",
  );

  return updateEvent;
};

export default useUpdateEvent;
