import { IncomingMessage } from 'http';
import { EventInDb, eventsCollectionName } from 'data/event';
import { eventPrivilege, PermissionCategory } from 'utils/permissions';
import db from '../db';
import { requirePermissions } from '../auth';

const getEvents = async (req: IncomingMessage) => {
  await requirePermissions({ [PermissionCategory.EVENT]: eventPrivilege.READ }, req);

  const events = await db.find<EventInDb>(eventsCollectionName);
  return events;
};

export default getEvents;
