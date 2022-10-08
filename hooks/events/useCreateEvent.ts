import axios from 'axios';
import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query';
import { CreateEventData, getEventDataForServer } from 'data/event';
import { getMessageFromError } from 'utils/error';
import { QueryKeys } from 'utils/queryClient';
import { APIRoute } from 'utils/routes';
import { displayErrorToast, displaySuccessToast } from 'utils/toast';

const createEventOnServer = async (eventData: CreateEventData) => {
  await axios.post(`${APIRoute.EVENTS}`, getEventDataForServer(eventData));
};

const useCreateEvent = (
  onSuccess: UseMutationOptions<void, unknown, CreateEventData>['onSuccess'],
) => {
  const queryClient = useQueryClient();

  const { mutate: createEvent } = useMutation(createEventOnServer, {
    onError: error => displayErrorToast({ title: getMessageFromError(error) }),
    onSuccess: (data, variables, context) => {
      displaySuccessToast({ title: "L'événement a bien été créé." });
      if (onSuccess) onSuccess(data, variables, context);
    },
    onSettled: () => queryClient.invalidateQueries([QueryKeys.EVENTS]),
  });

  return createEvent;
};

export default useCreateEvent;
