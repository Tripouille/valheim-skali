import Background from 'components/core/Containers/Background';
import PageTitle from 'components/core/Typography/PageTitle';
import EventForm from 'components/pages/Events/EventForm';
import useCreateEvent from 'hooks/events/useCreateEvent';

const NewEventPage = () => {
  const createEvent = useCreateEvent();

  return (
    <Background>
      <PageTitle title="Créer un événement" mb="8" />
      <EventForm onSubmit={createEvent} />
    </Background>
  );
};

export default NewEventPage;
