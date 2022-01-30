import React from 'react';
import { useDisclosure } from '@chakra-ui/react';
import { DataAttributes } from '@packages/utils/types';
import { getDataValue } from '@packages/utils/dataAttributes';
import { Event } from '@packages/store/events/type';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from '@packages/components/core/Overlay/Modal';
import Box from '@packages/components/core/Containers/Box';
import { EventContext, isEventClosed } from '../utils';
import EventItem from '../EventItem';

export interface EventCardProps extends DataAttributes {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ dataCy, event }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const eventIsClosed = isEventClosed(event, new Date());

  return (
    <>
      <Box
        dataCy={getDataValue(dataCy, 'card')}
        as="button"
        w="full"
        border="2px silver solid"
        borderRadius="md"
        p="4"
        opacity={eventIsClosed ? 0.6 : 1}
        cursor="pointer"
        _hover={{ backgroundColor: 'rgb(34, 72, 120)', borderColor: 'white' }}
        onClick={onOpen}
      >
        <EventItem
          dataCy={getDataValue(dataCy, 'card')}
          event={event}
          context={EventContext.LIST}
          eventIsClosed={eventIsClosed}
        />
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} size="6xl" scrollBehavior="inside" isCentered>
        <ModalOverlay bgColor="rgba(49, 130, 206,0.7)" />
        <ModalContent backgroundColor="blue.700" border="2px white solid">
          <ModalCloseButton />
          <ModalBody>
            <EventItem
              dataCy={getDataValue(dataCy, 'modal')}
              event={event}
              context={EventContext.MODAL}
              eventIsClosed={eventIsClosed}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EventCard;
