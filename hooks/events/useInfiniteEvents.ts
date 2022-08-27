import axios from 'axios';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Event, EventsPage } from 'data/event';
import useSession from 'hooks/useSession';
import { eventPrivilege, PermissionCategory } from 'utils/permissions';
import { QueryKeys } from 'utils/queryClient';
import { APIRoute } from 'utils/routes';

export const getEventsPageFromServer =
  (eventIdToInclude?: string) =>
  async ({ pageParam = 0 }) => {
    const queryParams = new URLSearchParams(
      eventIdToInclude
        ? { cursor: pageParam.toString(), including: eventIdToInclude }
        : { cursor: pageParam.toString() },
    );
    const { data } = await axios.get<EventsPage<Event>>(
      `${APIRoute.EVENTS}?${queryParams.toString()}`,
    );
    return data;
  };

const useInfiniteEvents = (options: { enabled: boolean; including?: string }) => {
  const session = useSession();

  const eventsQuery = useInfiniteQuery(
    [QueryKeys.EVENTS],
    getEventsPageFromServer(options?.including),
    {
      getNextPageParam: lastPage => lastPage.nextCursor,
      enabled:
        session.hasRequiredPermissions({
          [PermissionCategory.EVENT]: eventPrivilege.READ,
        }) && options.enabled,
    },
  );

  return eventsQuery;
};

export default useInfiniteEvents;
