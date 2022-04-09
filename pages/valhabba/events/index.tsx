import { GetServerSideProps } from 'next';
import React from 'react';
import getEvents from '@packages/api/events/getEvents';
import getHydrationProps from '@packages/utils/hydration';
import { QueryKeys } from '@packages/utils/queryClient';
import Events from '@packages/components/pages/Events';

const EventsPage = () => <Events />;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return {
    props: await getHydrationProps(async queryClient => {
      const events = await getEvents(req);
      queryClient.setQueryData(QueryKeys.EVENTS, events);
    }),
  };
};

export default EventsPage;
