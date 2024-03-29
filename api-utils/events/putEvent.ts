import { ObjectId } from 'bson';
import { NextApiRequest as Req, NextApiResponse as Res } from 'next';
import { requirePermissions } from 'api-utils/auth';
import { ServerException, replaceOneInCollection } from 'api-utils/common';
import { EventInDb, eventsCollectionName } from 'data/event';
import { PermissionCategory, eventPrivilege } from 'utils/permissions';
import db from '../db';
import { getNewEventFromBody, revalidateEventsPage } from './utils';

const putEvent = async (req: Req, res: Res) => {
  await requirePermissions({ [PermissionCategory.EVENT]: eventPrivilege.READ_WRITE }, req);

  const newEvent = getNewEventFromBody(req.body);

  const { id } = req.query as { id: string };
  const event = await db.findOne<EventInDb>(eventsCollectionName, { _id: new ObjectId(id) });
  if (!event) throw new ServerException(404);

  const result = await replaceOneInCollection<EventInDb>(eventsCollectionName, id, newEvent);
  if (!result.ok) throw new ServerException(500);

  res.status(200).json(result.value);

  revalidateEventsPage(res);
};

export default putEvent;
