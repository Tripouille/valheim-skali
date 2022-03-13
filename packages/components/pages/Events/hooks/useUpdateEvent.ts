import axios from 'axios';
import { Event, CreateEventData } from '@packages/data/event';
import { APIRoute } from '@packages/utils/routes';
import { QueryKeys } from '@packages/utils/queryClient';
import useOptimisticMutation from '@packages/utils/hooks/useOptimisticMutation';
import { setEventDataForServer } from '../utils';

const updateEventOnServer = (updatedEvent: Event) => async (newEvent: CreateEventData) => {
  setEventDataForServer(newEvent);
  await axios.put(`${APIRoute.EVENTS}/${updatedEvent._id}`, newEvent);
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
