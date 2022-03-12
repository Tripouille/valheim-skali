import { NextApiRequest as Req, NextApiResponse as Res } from 'next';
import { EventInDb, eventsCollectionName } from '@packages/data/event';
import { PermissionCategory, PermissionPrivilege } from '@packages/utils/auth';
import { requirePermissions } from '@packages/api/auth';
import db from '../db';
import { getNewEventFromBody } from './utils';

const createEvent = async (req: Req, res: Res) => {
  await requirePermissions({ [PermissionCategory.EVENT]: PermissionPrivilege.READ_WRITE }, req);

  const newEvent = getNewEventFromBody(req.body);

  const newEventId = await db.insert<EventInDb>(eventsCollectionName, newEvent);

  res.status(200).json({ ...newEvent, _id: newEventId });
};

export default createEvent;
