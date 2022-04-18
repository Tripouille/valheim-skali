import React from 'react';
import { BsPlusLg } from 'react-icons/bs';
import { useDisclosure } from '@chakra-ui/react';
import { PermissionCategory, PermissionPrivilege } from 'utils/auth';
import PageTitle from 'components/core/Typography/PageTitle';
import Background from 'components/core/Containers/Background';
import { VStack } from 'components/core/Containers/Stack';
import Secured from 'components/core/Authentication/Secured';
import Button from 'components/core/Interactive/Button';
import QueryHandler from 'components/core/Disclosure/QueryHandler';
import { useEvents } from './hooks/useEvents';
import useCreateEvent from './hooks/useCreateEvent';
import EventForm from './EventForm';
import EventCard from './EventCard';

const Events = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const eventsQuery = useEvents();
  const createEvent = useCreateEvent(onClose);

  return (
    <Secured permissions={{ [PermissionCategory.EVENT]: PermissionPrivilege.READ }}>
      <Background data-cy="events">
        <VStack spacing="7" position="relative">
          <PageTitle title="Événements" />
          <QueryHandler query={eventsQuery}>
            <Secured permissions={{ [PermissionCategory.EVENT]: PermissionPrivilege.READ_WRITE }}>
              <Button
                data-cy="create-event"
                position="absolute"
                top={0}
                right={0}
                mt="0 !important"
                leftIcon={<BsPlusLg />}
                colorScheme="green"
                alignSelf="end"
                onClick={onOpen}
              >
                Créer un événement
              </Button>
              <EventForm
                data-cy="create-event"
                isOpen={isOpen}
                onSubmit={createEvent}
                onClose={onClose}
              />
            </Secured>
            {eventsQuery.data?.map((event, index) => (
              <EventCard data-cy={`event-${index}`} key={event._id} event={event} />
            ))}
          </QueryHandler>
        </VStack>
      </Background>
    </Secured>
  );
};

export default Events;
