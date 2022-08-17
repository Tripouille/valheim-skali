import { UseMutationOptions } from '@tanstack/react-query';
import axios from 'axios';
import { CreateEventData, getEventDataForServer } from 'data/event';
import useOptimisticMutation from 'hooks/useOptimisticMutation';
import { APIRoute } from 'utils/routes';
import { QueryKeys } from 'utils/queryClient';

const createEventOnServer = async (eventData: CreateEventData) => {
  await axios.post(`${APIRoute.EVENTS}`, getEventDataForServer(eventData));
};

const useCreateEvent = (
  onSuccess: UseMutationOptions<void, unknown, CreateEventData>['onSuccess'],
) => {
  const createEvent = useOptimisticMutation<QueryKeys.EVENTS, CreateEventData>(
    QueryKeys.EVENTS,
    createEventOnServer,
    (previousEvents, eventData) => [...(previousEvents ?? []), { ...eventData, _id: 'new' }],
    "L'événement a bien été créé.",
    { onSuccess },
  );

  return createEvent;
};

export default useCreateEvent;
