import { UseMutationOptions } from 'react-query';
import axios from 'axios';
import { CreateEventData } from '@packages/data/event';
import { APIRoute } from '@packages/utils/routes';
import { QueryKeys } from '@packages/utils/queryClient';
import useOptimisticMutation from '@packages/utils/hooks/useOptimisticMutation';
import { getEventDataForServer } from '../utils';

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
