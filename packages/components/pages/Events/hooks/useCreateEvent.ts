import { UseMutationOptions } from 'react-query';
import axios from 'axios';
import { CreateEventData } from '@packages/data/event';
import { APIRoute } from '@packages/utils/routes';
import { QueryKeys } from '@packages/utils/queryClient';
import { toISOWithTimezone } from '@packages/utils/format';
import useOptimisticMutation from '@packages/utils/hooks/useOptimisticMutation';

const createEventOnServer = async (eventData: CreateEventData) => {
  eventData.startDate = toISOWithTimezone(eventData.startDate);
  eventData.endDate = eventData.endDate ? toISOWithTimezone(eventData.endDate) : undefined;
  await axios.post(`${APIRoute.EVENTS}`, eventData);
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
