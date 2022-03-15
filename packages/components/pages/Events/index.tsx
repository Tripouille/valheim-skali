import React from 'react';
import { BsPlusLg } from 'react-icons/bs';
import { useDisclosure } from '@chakra-ui/react';
import { getDataValue } from '@packages/utils/dataAttributes';
import { PermissionCategory, PermissionPrivilege } from '@packages/utils/auth';
import PageTitle from '@packages/components/core/Typography/PageTitle';
import Background from '@packages/components/core/Containers/Background';
import { VStack } from '@packages/components/core/Containers/Stack';
import Secured from '@packages/components/core/Authentication/Secured';
import Button from '@packages/components/core/Interactive/Button';
import QueryHandler from '@packages/components/core/Disclosure/QueryHandler';
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
      <Background>
        <VStack spacing="7" position="relative">
          <PageTitle title="Événements" />
          <QueryHandler query={eventsQuery}>
            <Secured permissions={{ [PermissionCategory.EVENT]: PermissionPrivilege.READ_WRITE }}>
              <Button
                dataCy={getDataValue('event', 'create', 'button')}
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
                dataCy={getDataValue('event', 'create', 'modal')}
                isOpen={isOpen}
                onClose={onClose}
                onSubmit={createEvent}
              />
            </Secured>
            {eventsQuery.data?.map((event, index) => (
              <EventCard dataCy={getDataValue('event', index)} key={event._id} event={event} />
            ))}
          </QueryHandler>
        </VStack>
      </Background>
    </Secured>
  );
};

export default Events;
