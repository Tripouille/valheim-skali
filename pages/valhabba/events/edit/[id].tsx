import { useRouter } from 'next/router';
import Background from 'components/core/Containers/Background';
import QueryHandler from 'components/core/Disclosure/QueryHandler';
import PageTitle from 'components/core/Typography/PageTitle';
import EventForm from 'components/pages/Events/EventForm';
import useDeleteEvent from 'hooks/events/useDeleteEvent';
import useEvent from 'hooks/events/useEvent';
import useUpdateEvent from 'hooks/events/useUpdateEvent';
import { getRouteParameterAsString } from 'utils/routes';

const EditEventPage = () => {
  const router = useRouter();
  const eventId = getRouteParameterAsString(router.query.id);

  const eventQuery = useEvent(eventId);
  const event = eventQuery.data;

  const updateEvent = useUpdateEvent(eventId);
  const deleteEvent = useDeleteEvent(eventId);

  return (
    <Background>
      <PageTitle title="Modifier un événement" mb="8" />
      <QueryHandler query={eventQuery}>
        {event && <EventForm event={event} onSubmit={updateEvent} onDelete={deleteEvent} />}
      </QueryHandler>
    </Background>
  );
};

export default EditEventPage;
