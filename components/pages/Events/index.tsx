import { useRouter } from 'next/router';
import React from 'react';
import { BsPlusLg } from 'react-icons/bs';
import { useDisclosure } from '@chakra-ui/react';
import { NavRoute, ROUTES_TO_LABEL } from 'utils/routes';
import { eventPrivilege, PermissionCategory } from 'utils/permissions';
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
  const router = useRouter();
  const eventId = router.query.id ?? undefined;

  const createModal = useDisclosure();

  const eventsQuery = useEvents();
  const createEvent = useCreateEvent(createModal.onClose);

  return (
    <Secured permissions={{ [PermissionCategory.EVENT]: eventPrivilege.READ }}>
      <Background data-cy="events">
        <VStack spacing="7" position="relative">
          <PageTitle title={ROUTES_TO_LABEL[NavRoute.EVENTS]} />
          <Secured permissions={{ [PermissionCategory.EVENT]: eventPrivilege.READ_WRITE }}>
            <Button
              data-cy="create-event"
              position={{ md: 'absolute' }}
              alignSelf={{ base: 'center', md: 'end' }}
              mt="1rem !important"
              leftIcon={<BsPlusLg />}
              colorScheme="green"
              onClick={createModal.onOpen}
            >
              Créer un événement
            </Button>
            <EventForm
              data-cy="create-event"
              isOpen={createModal.isOpen}
              onSubmit={createEvent}
              onClose={createModal.onClose}
            />
          </Secured>
          <QueryHandler query={eventsQuery}>
            {eventsQuery.data?.map((event, index) => (
              <EventCard
                data-cy={`event-${index}`}
                key={event._id}
                event={event}
                isOpen={eventId === event._id}
              />
            ))}
          </QueryHandler>
        </VStack>
      </Background>
    </Secured>
  );
};

export default Events;
