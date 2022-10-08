import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useRef } from 'react';
import { BsPlusLg } from 'react-icons/bs';
import { useInView } from 'react-intersection-observer';
import { useDisclosure } from '@chakra-ui/react';
import { getRouteParameterAsString, NavRoute, ROUTES_TO_LABEL } from 'utils/routes';
import { eventPrivilege, PermissionCategory } from 'utils/permissions';
import PageTitle from 'components/core/Typography/PageTitle';
import Background from 'components/core/Containers/Background';
import { VStack } from 'components/core/Containers/Stack';
import Secured from 'components/core/Authentication/Secured';
import Button from 'components/core/Interactive/Button';
import Loading from 'components/core/Feedback/Loading';
import useInfiniteEvents from 'hooks/events/useInfiniteEvents';
import useCreateEvent from 'hooks/events/useCreateEvent';
import { scrollIntoViewIfNeeded } from 'utils/window';
import EventForm from './EventForm';
import EventCard from './EventCard';

const Events = () => {
  const router = useRouter();
  const canFetchEvents = router.isReady; // fetchNextPage() doesn't watch for useInfiniteQuery()'s enabled option
  const queryEventId = getRouteParameterAsString(router.query.id);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteEvents({
    enabled: canFetchEvents,
    including: queryEventId,
  });

  // Fetch next page if last page (start or end) is visible
  const { ref: lastPageStartRef } = useInView({
    onChange: lastPageStartIsInView => {
      if (canFetchEvents && lastPageStartIsInView && !isFetchingNextPage) fetchNextPage();
    },
  });
  const { ref: lastPageEndRef } = useInView({
    onChange: lastPageEndIsInView => {
      if (canFetchEvents && lastPageEndIsInView && !isFetchingNextPage) fetchNextPage();
    },
  });

  // Scroll to event whose id is in query (url)
  const queryEventIsInData = useMemo(
    () => data?.pages.some(page => page.events.some(event => event._id === queryEventId)),
    [data?.pages, queryEventId],
  );
  const queryEventRef = useRef(null);
  useEffect(() => {
    if (queryEventRef.current) scrollIntoViewIfNeeded(queryEventRef.current);
  }, [queryEventId, data?.pages.length]);

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
          {queryEventId && !queryEventIsInData ? (
            <>
              <Loading />
              Téléchargement de l&apos;événement demandé...
            </>
          ) : (
            data?.pages.map((eventsPage, pageIndex) => (
              <React.Fragment key={pageIndex}>
                {hasNextPage && !isFetchingNextPage && pageIndex === data.pages.length - 1 && (
                  <div ref={lastPageStartRef}></div>
                )}
                {eventsPage.events.map((event, index) => (
                  <EventCard
                    data-cy={`event-${pageIndex}-${index}`}
                    key={event._id}
                    innerRef={event._id === queryEventId ? queryEventRef : undefined}
                    event={event}
                    isOpen={queryEventId === event._id}
                  />
                ))}
                {hasNextPage && !isFetchingNextPage && pageIndex === data.pages.length - 1 && (
                  <div ref={lastPageEndRef}></div>
                )}
              </React.Fragment>
            ))
          )}
          {isFetchingNextPage && <Loading />}
        </VStack>
      </Background>
    </Secured>
  );
};

export default Events;
