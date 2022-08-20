import { useRouter } from 'next/router';
import React, { useEffect, useRef } from 'react';
import { BsPlusLg } from 'react-icons/bs';
import { useInView } from 'react-intersection-observer';
import { useDisclosure } from '@chakra-ui/react';
import { NavRoute, ROUTES_TO_LABEL } from 'utils/routes';
import { eventPrivilege, PermissionCategory } from 'utils/permissions';
import PageTitle from 'components/core/Typography/PageTitle';
import Background from 'components/core/Containers/Background';
import { VStack } from 'components/core/Containers/Stack';
import Secured from 'components/core/Authentication/Secured';
import Button from 'components/core/Interactive/Button';
import Loading from 'components/core/Feedback/Loading';
import useInfiniteEvents from 'hooks/events/useInfiniteEvents';
import useCreateEvent from 'hooks/events/useCreateEvent';
import EventForm from './EventForm';
import EventCard from './EventCard';
import { scrollIntoViewIfNeeded } from 'utils/window';

const Events = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteEvents();

  const { ref: lastPageRef } = useInView({
    onChange: lastPageIsInView => {
      if (lastPageIsInView) fetchNextPage();
    },
    initialInView: true,
  });

  // Scroll to event whose id is in query (url)
  const router = useRouter();
  const eventId = router.query.id ?? undefined;
  const queryEventRef = useRef(null);
  const main = typeof window !== 'undefined' ? document.querySelector('main') : undefined;
  useEffect(() => {
    if (eventId && main) {
      if (!queryEventRef.current) main.scrollTo(0, main.scrollHeight);
      else scrollIntoViewIfNeeded(queryEventRef.current);
    }
  }, [eventId, main, data?.pages.length]);

  const createModal = useDisclosure();
  const createEvent = useCreateEvent(createModal.onClose);

  return (
    <Secured permissions={{ [PermissionCategory.EVENT]: eventPrivilege.READ }} redirectOnFail>
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
          {data?.pages.map((eventsPage, pageIndex) => (
            <React.Fragment key={pageIndex}>
              {hasNextPage && !isFetchingNextPage && pageIndex === data.pages.length - 1 && (
                <div ref={lastPageRef}></div>
              )}
              {eventsPage.events.map((event, index) => (
                <EventCard
                  data-cy={`event-${pageIndex}-${index}`}
                  key={event._id}
                  innerRef={event._id === eventId ? queryEventRef : undefined}
                  event={event}
                  isOpen={eventId === event._id}
                />
              ))}
            </React.Fragment>
          ))}
          {isFetchingNextPage && <Loading />}
        </VStack>
      </Background>
    </Secured>
  );
};

export default Events;
