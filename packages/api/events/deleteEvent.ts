import { NextApiRequest as Req, NextApiResponse as Res } from 'next';
import { ObjectId } from 'bson';
import { EventInDb, eventsCollectionName } from '@packages/data/event';
import { PermissionCategory, PermissionPrivilege } from '@packages/utils/auth';
import { requirePermissions } from '@packages/api/auth';
import { ServerException } from '@packages/api/common';
import db from '@packages/api/db';

const deleteEvent = async (req: Req, res: Res) => {
  await requirePermissions({ [PermissionCategory.EVENT]: PermissionPrivilege.READ_WRITE }, req);

  const { id } = req.query as { id: string };

  const event = await db.findOne<EventInDb>(eventsCollectionName, { _id: new ObjectId(id) });
  if (!event) throw new ServerException(404);

  await db.remove<EventInDb>(eventsCollectionName, id);

  res.status(200).end();
};

export default deleteEvent;
