import React from 'react';
import {
  Box,
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react';
import { Event } from '@packages/store/events/type';
import { ElementCategoriesProps } from '@packages/utils/types';
import { EventContext, isEventClosed } from '../utils';
import EventItem from '../EventItem';

export interface EventCardProps extends ElementCategoriesProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event, elementCategories }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const eventIsClosed = isEventClosed(event, new Date());

  return (
    <>
      <Box
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
          event={event}
          context={EventContext.LIST}
          eventIsClosed={eventIsClosed}
          elementCategories={elementCategories.concat(['card'])}
        />
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} size="6xl">
        <ModalOverlay bgColor="rgba(49, 130, 206,0.7)" />
        <ModalContent backgroundColor="blue.700" border="2px white solid">
          <ModalCloseButton />
          <ModalBody>
            <EventItem
              event={event}
              context={EventContext.MODAL}
              eventIsClosed={eventIsClosed}
              elementCategories={elementCategories.concat(['modal'])}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EventCard;
