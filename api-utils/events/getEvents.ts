import { NextApiRequest as Req, NextApiResponse as Res } from 'next';
import { requirePermissions } from 'api-utils/auth';
import { ServerException } from 'api-utils/common';
import db from 'api-utils/db';
import { eventComp, EventInDb, eventsCollectionName, EventsPage } from 'data/event';
import { eventPrivilege, PermissionCategory } from 'utils/permissions';

const EVENTS_NB_PER_REQUEST = 5;

export const getEventsPage = async (cursor: number): Promise<EventsPage<EventInDb>> => {
  const events = await db.find<EventInDb>(eventsCollectionName);
  const now = new Date();
  events.sort(eventComp(now));

  const endCursor = Math.min(cursor + EVENTS_NB_PER_REQUEST, events.length);
  return {
    events: events.slice(cursor, endCursor),
    nextCursor: endCursor === events.length ? undefined : endCursor,
    usedTags: cursor === 0 ? [...new Set(events.flatMap(event => event.tags))] : undefined,
  };
};

const getEvents = async (req: Req, res: Res) => {
  await requirePermissions({ [PermissionCategory.EVENT]: eventPrivilege.READ }, req);

  if (Array.isArray(req.query.cursor)) throw new ServerException(400);
  const cursor = parseInt(req.query.cursor);

  const eventsPage = await getEventsPage(cursor);

  res.status(200).json(eventsPage);
};

export default getEvents;
