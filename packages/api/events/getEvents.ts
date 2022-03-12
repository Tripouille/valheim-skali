import { NextApiRequest as Req, NextApiResponse as Res } from 'next';
import { EventInDb, eventsCollectionName } from '@packages/data/event';
import db from '../db';
import { PermissionCategory, PermissionPrivilege } from '@packages/utils/auth';
import { requirePermissions } from '../auth';

const getEvents = async (req: Req, res: Res) => {
  await requirePermissions({ [PermissionCategory.EVENT]: PermissionPrivilege.READ }, req);

  const events = await db.find<EventInDb>(eventsCollectionName);

  res.status(200).json(events);
};

export default getEvents;
