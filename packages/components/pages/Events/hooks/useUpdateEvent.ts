import axios from 'axios';
import { Event, CreateEventData } from '@packages/data/event';
import { APIRoute } from '@packages/utils/routes';
import { QueryKeys } from '@packages/utils/queryClient';
import useOptimisticMutation from '@packages/utils/hooks/useOptimisticMutation';
import { toISOWithTimezone } from '@packages/utils/format';

const updateEventOnServer = (updatedEvent: Event) => async (newEvent: CreateEventData) => {
  // TODO: factor this
  newEvent.startDate = toISOWithTimezone(newEvent.startDate);
  newEvent.endDate = newEvent.endDate ? toISOWithTimezone(newEvent.endDate) : undefined;
  await axios.put(`${APIRoute.EVENTS}/${updatedEvent._id}`, newEvent);
};

const useUpdateEvent = (updatedEvent: Event) => {
  const updateEvent = useOptimisticMutation<QueryKeys.EVENTS, CreateEventData>(
    QueryKeys.EVENTS,
    updateEventOnServer(updatedEvent),
    (previousEvents, newEvent) =>
      previousEvents?.map(event =>
        event._id === updatedEvent._id
          ? { ...event, ...{ ...newEvent, _id: updatedEvent._id } }
          : event,
      ) ?? [],
    "L'événement a bien été mis à jour.",
  );

  return updateEvent;
};

export default useUpdateEvent;
