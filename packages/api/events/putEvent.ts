import { NextApiRequest as Req, NextApiResponse as Res } from 'next';
import { ObjectId } from 'bson';
import { EventInDb, eventsCollectionName } from '@packages/data/event';
import { PermissionCategory, PermissionPrivilege } from '@packages/utils/auth';
import { requirePermissions } from '@packages/api/auth';
import { ServerException, replaceOneInCollection } from '@packages/api/common';
import db from '../db';
import { getNewEventFromBody } from './utils';

const putEvent = async (req: Req, res: Res) => {
  await requirePermissions({ [PermissionCategory.EVENT]: PermissionPrivilege.READ_WRITE }, req);

  const newEvent = getNewEventFromBody(req.body);

  const { id } = req.query as { id: string };
  const event = await db.findOne<EventInDb>(eventsCollectionName, { _id: new ObjectId(id) });
  if (!event) throw new ServerException(404);

  const result = await replaceOneInCollection<EventInDb>(eventsCollectionName, id, newEvent);
  if (!result.ok) throw new ServerException(500);

  res.status(200).json(result.value);
};

export default putEvent;
