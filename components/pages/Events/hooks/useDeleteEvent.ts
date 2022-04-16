import axios from 'axios';
import { Event } from 'data/event';
import { APIRoute } from 'utils/routes';
import { QueryKeys, QueryTypes } from 'utils/queryClient';
import useOptimisticMutation from 'utils/hooks/useOptimisticMutation';

const deleteEventOnServer = (deletedEvent: Event) => async () => {
  await axios.delete(`${APIRoute.EVENTS}/${deletedEvent._id}`);
};

const getUpdatedEvents = (deletedEvent: Event) => (previousEvents: QueryTypes[QueryKeys.EVENTS]) =>
  previousEvents?.filter(event => event._id !== deletedEvent._id) ?? [];

const useDeleteEvent = (deletedEvent: Event) => {
  const deleteEvent = useOptimisticMutation(
    QueryKeys.EVENTS,
    deleteEventOnServer(deletedEvent),
    getUpdatedEvents(deletedEvent),
    "L'événement a bien été supprimé.",
  );

  return deleteEvent;
};

export default useDeleteEvent;
