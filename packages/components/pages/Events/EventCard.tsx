import React, { KeyboardEventHandler, MouseEventHandler } from 'react';
import { BiEdit } from 'react-icons/bi';
import { useDisclosure } from '@chakra-ui/react';
import { getDataValue, DataAttributes } from '@packages/utils/dataAttributes';
import { PermissionCategory, PermissionPrivilege } from '@packages/utils/auth';
import { Event } from '@packages/data/event';
import Secured from '@packages/components/core/Authentication/Secured';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from '@packages/components/core/Overlay/Modal';
import Box from '@packages/components/core/Containers/Box';
import IconButton from '@packages/components/core/Interactive/IconButton';
import theme from '@packages/theme';
import useUpdateEvent from './hooks/useUpdateEvent';
import useDeleteEvent from './hooks/useDeleteEvent';
import { editIconSize, EventContext, isEventClosed } from './utils';
import EventItem from './EventItem';
import EventForm from './EventForm';

export interface EventCardProps extends DataAttributes {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ dataCy, event }) => {
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
        dataCy={getDataValue(dataCy, 'card')}
        role="button"
        tabIndex={0}
        position="relative"
        w="full"
        border="2px silver solid"
        borderRadius="md"
        p="4"
        opacity={eventIsClosed ? 0.6 : 1}
        cursor="pointer"
        _hover={{ backgroundColor: theme.colors.backgroundHover, borderColor: 'white' }}
        onClick={itemModal.onOpen}
        onKeyPress={handleCardKeyPress}
      >
        <Secured permissions={{ [PermissionCategory.EVENT]: PermissionPrivilege.READ_WRITE }}>
          <IconButton
            dataCy={getDataValue(dataCy, 'edit_button')}
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
        <EventItem
          dataCy={getDataValue(dataCy, 'card')}
          event={event}
          context={EventContext.LIST}
          eventIsClosed={eventIsClosed}
        />
      </Box>
      <Modal isOpen={itemModal.isOpen} onClose={itemModal.onClose}>
        <ModalOverlay />
        <ModalContent border="2px white solid">
          <ModalCloseButton dataCy={getDataValue(dataCy, 'close_button')} />
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
      <EventForm
        dataCy={getDataValue(dataCy, 'edit_modal')}
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
