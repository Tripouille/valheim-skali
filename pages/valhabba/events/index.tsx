import { GetStaticProps } from 'next';
import React from 'react';
import { EventInDb, eventsCollectionName } from 'data/event';
import db from 'api-utils/db';
import { getVisitorPermissions } from 'api-utils/auth';
import getHydrationProps from 'utils/hydration';
import { QueryKeys } from 'utils/queryClient';
import { permissionsMeetRequirement, PermissionCategory, PermissionPrivilege } from 'utils/auth';
import Events from 'components/pages/Events';

const EventsPage = () => <Events />;

// TODO: refactor this logic once applied to another page
export const getStaticProps: GetStaticProps = async () => {
  return {
    props: await getHydrationProps(async queryClient => {
      const visitorPermissions = await getVisitorPermissions();
      const requiredPermissionsToReadEvents = {
        [PermissionCategory.EVENT]: PermissionPrivilege.READ,
      };

      if (permissionsMeetRequirement(visitorPermissions, requiredPermissionsToReadEvents)) {
        const events = await db.find<EventInDb>(eventsCollectionName);
        queryClient.setQueryData(QueryKeys.EVENTS, events);
      }
    }),
  };
};

export default EventsPage;
