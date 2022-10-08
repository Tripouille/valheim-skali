import { useRouter } from 'next/router';
import React, { KeyboardEventHandler, MouseEventHandler, Ref, useEffect, useRef } from 'react';
import { BiEdit } from 'react-icons/bi';
import { useDisclosure } from '@chakra-ui/react';
import Secured from 'components/core/Authentication/Secured';
import Box from 'components/core/Containers/Box';
import IconButton from 'components/core/Interactive/IconButton';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from 'components/core/Overlay/Modal';
import { Event, isEventClosed } from 'data/event';
import useDeleteEvent from 'hooks/events/useDeleteEvent';
import useUpdateEvent from 'hooks/events/useUpdateEvent';
import { eventPrivilege, PermissionCategory } from 'utils/permissions';
import { CypressProps } from 'utils/types';
import EventForm from './EventForm';
import EventItem from './EventItem';
import { editIconSize, EventContext } from './utils';

export interface EventCardProps extends CypressProps {
  event: Event;
  isOpen: boolean;
  innerRef?: Ref<HTMLDivElement>;
}

const EventCard: React.FC<EventCardProps> = ({ 'data-cy': dataCy, event, isOpen, innerRef }) => {
  const router = useRouter();

  const itemModal = useDisclosure({
    isOpen,
    onOpen: () => router.push(`events?id=${event._id}`, undefined, { shallow: true }),
    onClose: () => router.push('events', undefined, { shallow: true }),
  });
  const editModal = useDisclosure();

  const updateEvent = useUpdateEvent(event);
  const deleteEvent = useDeleteEvent(event);

  const eventIsClosed = isEventClosed(event, new Date());

  const eventCardRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (isOpen) eventCardRef.current?.scrollIntoView({ block: 'center' });
  }, [isOpen]);

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
        ref={innerRef}
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
        <Secured permissions={{ [PermissionCategory.EVENT]: eventPrivilege.READ_WRITE }}>
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
        <EventItem
          event={event}
          context={EventContext.LIST}
          eventIsClosed={eventIsClosed}
          ref={eventCardRef}
        />
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
