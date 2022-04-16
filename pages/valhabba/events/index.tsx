import { GetServerSideProps } from 'next';
import React from 'react';
import getEvents from 'api-utils/events/getEvents';
import getHydrationProps from 'utils/hydration';
import { QueryKeys } from 'utils/queryClient';
import Events from 'components/pages/Events';

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
