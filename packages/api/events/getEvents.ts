import { NextApiRequest as Req, NextApiResponse as Res } from 'next';
import { EventInDb, eventsCollectionName } from '@packages/data/event';
import db from '../db';

const getEvents = async (req: Req, res: Res) => {
  // TODO: will be used when the visitor role exists
  // await requirePermissions({ [PermissionCategory.EVENT]: PermissionPrivilege.READ }, req);

  const events = await db.find<EventInDb>(eventsCollectionName);

  res.status(200).json(events);
};

export default getEvents;
