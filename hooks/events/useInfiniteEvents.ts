import axios from 'axios';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Event, EventsPage } from 'data/event';
import useSession from 'hooks/useSession';
import { eventPrivilege, PermissionCategory } from 'utils/permissions';
import { QueryKeys } from 'utils/queryClient';
import { APIRoute } from 'utils/routes';

export const getEventsPageFromServer = async ({ pageParam = 0 }) => {
  const { data } = await axios.get<EventsPage<Event>>(`${APIRoute.EVENTS}?cursor=${pageParam}`);
  return data;
};

const useInfiniteEvents = () => {
  const session = useSession();

  const eventsQuery = useInfiniteQuery([QueryKeys.EVENTS], getEventsPageFromServer, {
    getNextPageParam: lastPage => lastPage.nextCursor,
    enabled: session.hasRequiredPermissions({
      [PermissionCategory.EVENT]: eventPrivilege.READ,
    }),
  });

  return eventsQuery;
};

export default useInfiniteEvents;
