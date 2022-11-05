import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { KeyboardEventHandler, Ref, useEffect, useRef } from 'react';
import { BiEdit } from 'react-icons/bi';
import { useDisclosure } from '@chakra-ui/react';
import Secured from 'components/core/Authentication/Secured';
import Box from 'components/core/Containers/Box';
import Button from 'components/core/Interactive/Button';
import IconButton from 'components/core/Interactive/IconButton';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from 'components/core/Overlay/Modal';
import { Event, isEventClosed } from 'data/event';
import { eventPrivilege, PermissionCategory } from 'utils/permissions';
import { getRoute, NavRoute } from 'utils/routes';
import { CypressProps } from 'utils/types';
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

  const eventIsClosed = isEventClosed(event, new Date());

  const eventCardRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (isOpen) eventCardRef.current?.scrollIntoView({ block: 'center' });
  }, [isOpen]);

  const handleCardKeyPress: KeyboardEventHandler<HTMLDivElement> = e => {
    if (e.key === 'Enter') itemModal.onOpen();
  };

  return (
    <>
      <Box
        data-cy={`${dataCy}-card`}
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
          <NextLink href={getRoute(`${NavRoute.EVENTS}/edit/${event._id}`)} passHref>
            <IconButton
              data-cy="edit"
              as="a"
              position="absolute"
              top="3"
              right="3"
              aria-label="Modifier l'événement"
              title="Modifier l'événement"
              icon={<BiEdit size="30" />}
              variant="ghost"
              size={editIconSize}
              onClick={e => e.stopPropagation()}
            />
          </NextLink>
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
          <ModalFooter>
            <Secured permissions={{ [PermissionCategory.EVENT]: eventPrivilege.READ_WRITE }}>
              <NextLink href={getRoute(`${NavRoute.EVENTS}/edit/${event._id}`)} passHref>
                <Button data-cy="edit" leftIcon={<BiEdit />}>
                  Modifier
                </Button>
              </NextLink>
            </Secured>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EventCard;
