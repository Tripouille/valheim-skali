import axios from 'axios';
import { Event, CreateEventData } from 'data/event';
import useOptimisticMutation from 'hooks/useOptimisticMutation';
import { APIRoute } from 'utils/routes';
import { QueryKeys } from 'utils/queryClient';
import { getEventDataForServer } from '../utils';

const updateEventOnServer = (updatedEvent: Event) => async (newEvent: CreateEventData) => {
  await axios.put(`${APIRoute.EVENTS}/${updatedEvent._id}`, getEventDataForServer(newEvent));
};

const useUpdateEvent = (updatedEvent: Event) => {
  const updateEvent = useOptimisticMutation<QueryKeys.EVENTS, CreateEventData>(
    QueryKeys.EVENTS,
    updateEventOnServer(updatedEvent),
    (previousEvents, newEvent) =>
      previousEvents?.map(event =>
        event._id === updatedEvent._id
          ? {
              ...event,
              ...{ ...newEvent, _id: updatedEvent._id },
            }
          : event,
      ) ?? [],
    "L'événement a bien été mis à jour.",
  );

  return updateEvent;
};

export default useUpdateEvent;
