import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Event, eventComp } from 'data/event';
import useSession from 'hooks/useSession';
import { APIRoute } from 'utils/routes';
import { QueryKeys, QueryTypes } from 'utils/queryClient';
import { eventPrivilege, PermissionCategory } from 'utils/permissions';

export const getEventsFromServer = async (): Promise<Event[]> => {
  const { data } = await axios.get<Event[]>(APIRoute.EVENTS);
  return data;
};

const useEvents = () => {
  const session = useSession();

  const sortEvents = useCallback((events: QueryTypes[QueryKeys.EVENTS]) => {
    const now = new Date();
    return events.sort(eventComp(now));
  }, []);

  const eventsQuery = useQuery([QueryKeys.EVENTS], getEventsFromServer, {
    enabled: session.hasRequiredPermissions({
      [PermissionCategory.EVENT]: eventPrivilege.READ,
    }),
    select: sortEvents,
  });

  return eventsQuery;
};

export default useEvents;
