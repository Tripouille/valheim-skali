import { GetStaticProps } from 'next';
import React from 'react';
import { InfiniteData } from '@tanstack/react-query';
import { getVisitorPermissions } from 'api-utils/auth';
import { getEventsPage } from 'api-utils/events/getEvents';
import Events from 'components/pages/Events';
import { EventInDb, EventsPage } from 'data/event';
import getHydrationProps from 'utils/hydration';
import { permissionsMeetRequirement, PermissionCategory, eventPrivilege } from 'utils/permissions';
import { QueryKeys } from 'utils/queryClient';

const EventsPageComponent = () => <Events />;

// When using getStaticProps, the _app getInitialProps is not re-run and
// is used at its build version (visitor permissions only)
// Note that this will result in different outputs in development and production
export const getStaticProps: GetStaticProps = async () => ({
  props: await getHydrationProps(async queryClient => {
    const visitorPermissions = await getVisitorPermissions();
    const requiredPermissionsToReadEvents = {
      [PermissionCategory.EVENT]: eventPrivilege.READ,
    };

    if (permissionsMeetRequirement(visitorPermissions, requiredPermissionsToReadEvents)) {
      const firstEventsPage = await getEventsPage(0);
      queryClient.setQueryData<InfiniteData<EventsPage<EventInDb>>>([QueryKeys.EVENTS], {
        pages: [firstEventsPage],
        pageParams: [0],
      });
    }
  }),
});

export default EventsPageComponent;
