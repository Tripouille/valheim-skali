import { NextApiRequest as Req, NextApiResponse as Res } from 'next';
import { requirePermissions } from 'api-utils/auth';
import db from 'api-utils/db';
import { EventInDb, eventsCollectionName } from 'data/event';
import { PermissionCategory, eventPrivilege } from 'utils/permissions';
import { getNewEventFromBody, revalidateEventsPage } from './utils';

const createEvent = async (req: Req, res: Res) => {
  await requirePermissions({ [PermissionCategory.EVENT]: eventPrivilege.READ_WRITE }, req);

  const newEvent = getNewEventFromBody(req.body);

  const newEventId = await db.insert<EventInDb>(eventsCollectionName, newEvent);

  res.status(201).json({ ...newEvent, _id: newEventId });

  revalidateEventsPage(res);
};

export default createEvent;
