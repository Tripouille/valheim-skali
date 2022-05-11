import React, { KeyboardEventHandler, MouseEventHandler } from 'react';
import { BiEdit } from 'react-icons/bi';
import { useDisclosure } from '@chakra-ui/react';
import { CypressProps } from 'utils/types';
import { PermissionCategory, PermissionPrivilege } from 'utils/auth';
import { Event } from 'data/event';
import Secured from 'components/core/Authentication/Secured';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from 'components/core/Overlay/Modal';
import Box from 'components/core/Containers/Box';
import IconButton from 'components/core/Interactive/IconButton';
import useUpdateEvent from './hooks/useUpdateEvent';
import useDeleteEvent from './hooks/useDeleteEvent';
import { editIconSize, EventContext, isEventClosed } from './utils';
import EventItem from './EventItem';
import EventForm from './EventForm';

export interface EventCardProps extends CypressProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ 'data-cy': dataCy, event }) => {
  const itemModal = useDisclosure();
  const editModal = useDisclosure();

  const updateEvent = useUpdateEvent(event);
  const deleteEvent = useDeleteEvent(event);

  const eventIsClosed = isEventClosed(event, new Date());

  const handleCardKeyPress: KeyboardEventHandler<HTMLDivElement> = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      itemModal.onOpen();
    }
  };

  const handleEditButtonClick: MouseEventHandler<HTMLButtonElement> = e => {
    e.stopPropagation();
    editModal.onOpen();
  };

  return (
    <>
      <Box
        data-cy={dataCy}
        role="button"
        tabIndex={0}
        position="relative"
        w="full"
        border="2px silver solid"
        borderRadius="md"
        p="4"
        opacity={eventIsClosed ? 0.6 : 1}
        cursor="pointer"
        _hover={{ backgroundColor: 'backgroundHover', borderColor: 'white' }}
        onClick={itemModal.onOpen}
        onKeyPress={handleCardKeyPress}
      >
        <Secured permissions={{ [PermissionCategory.EVENT]: PermissionPrivilege.READ_WRITE }}>
          <IconButton
            data-cy="edit"
            position="absolute"
            top="3"
            right="3"
            aria-label="Modifier l'événement"
            title="Modifier l'événement"
            icon={<BiEdit size="30" />}
            variant="ghost"
            size={editIconSize}
            onClick={handleEditButtonClick}
            onKeyPress={e => e.stopPropagation()}
          />
        </Secured>
        <EventItem event={event} context={EventContext.LIST} eventIsClosed={eventIsClosed} />
      </Box>
      <Modal isOpen={itemModal.isOpen} onClose={itemModal.onClose}>
        <ModalOverlay />
        <ModalContent data-cy={dataCy} border="2px white solid">
          <ModalCloseButton />
          <ModalBody>
            <EventItem event={event} context={EventContext.MODAL} eventIsClosed={eventIsClosed} />
          </ModalBody>
        </ModalContent>
      </Modal>
      <EventForm
        data-cy="edit-event"
        event={event}
        isOpen={editModal.isOpen}
        onClose={editModal.onClose}
        onSubmit={updateEvent}
        onDelete={deleteEvent}
      />
    </>
  );
};

export default EventCard;
