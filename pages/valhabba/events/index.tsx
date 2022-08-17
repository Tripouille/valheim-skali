import { GetStaticProps } from 'next';
import React from 'react';
import { EventInDb, eventsCollectionName } from 'data/event';
import db from 'api-utils/db';
import { getVisitorPermissions } from 'api-utils/auth';
import getHydrationProps from 'utils/hydration';
import { QueryKeys } from 'utils/queryClient';
import { permissionsMeetRequirement, PermissionCategory, eventPrivilege } from 'utils/permissions';
import Events from 'components/pages/Events';

const EventsPage = () => <Events />;

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
      const events = await db.find<EventInDb>(eventsCollectionName);
      queryClient.setQueryData([QueryKeys.EVENTS], events);
    }
  }),
});

export default EventsPage;
