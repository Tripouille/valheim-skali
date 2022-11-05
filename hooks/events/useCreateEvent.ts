import axios from 'axios';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateEventData, Event, getEventDataForServer } from 'data/event';
import { getMessageFromError } from 'utils/error';
import { QueryKeys } from 'utils/queryClient';
import { APIRoute, getRoute } from 'utils/routes';
import { displayErrorToast, displaySuccessToast } from 'utils/toast';

const createEventOnServer = async (eventData: CreateEventData) => {
  const { data } = await axios.post<Event>(`${APIRoute.EVENTS}`, getEventDataForServer(eventData));
  return data;
};

const useCreateEvent = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Not using useOptimisticMutation because of infinite scrolling
  const { mutate: createEvent } = useMutation(createEventOnServer, {
    onError: error => displayErrorToast({ title: getMessageFromError(error) }),
    onSuccess: newEvent => {
      displaySuccessToast({ title: "L'événement a bien été créé." });
      router.push(getRoute(`events?id=${newEvent._id}`));
    },
    onSettled: () => queryClient.invalidateQueries([QueryKeys.EVENTS]),
  });

  return createEvent;
};

export default useCreateEvent;
