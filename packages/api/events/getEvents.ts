import { IncomingMessage } from 'http';
import { EventInDb, eventsCollectionName } from '@packages/data/event';
import db from '../db';
import { PermissionCategory, PermissionPrivilege } from '@packages/utils/auth';
import { requirePermissions } from '../auth';

const getEvents = async (req: IncomingMessage) => {
  await requirePermissions({ [PermissionCategory.EVENT]: PermissionPrivilege.READ }, req);

  const events = await db.find<EventInDb>(eventsCollectionName);
  return events;
};

export default getEvents;
