import { useCallback } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Event } from 'data/event';
import { APIRoute } from 'utils/routes';
import { QueryKeys, QueryTypes } from 'utils/queryClient';
import useSession from 'utils/hooks/useSession';
import { PermissionCategory, PermissionPrivilege } from 'utils/auth';
import { eventComp } from '../utils';

export const getEvents = async (): Promise<Event[]> => {
  const { data } = await axios.get<Event[]>(APIRoute.EVENTS);
  return data;
};

export const useEvents = () => {
  const session = useSession();

  const sortEvents = useCallback((events: QueryTypes[QueryKeys.EVENTS]) => {
    const now = new Date();
    return events.sort(eventComp(now));
  }, []);

  const eventsQuery = useQuery(QueryKeys.EVENTS, getEvents, {
    enabled: session.hasRequiredPermissions({
      [PermissionCategory.EVENT]: PermissionPrivilege.READ,
    }),
    select: sortEvents,
  });

  return eventsQuery;
};
