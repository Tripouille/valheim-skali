import { ObjectId } from 'bson';
import { NextApiRequest as Req, NextApiResponse as Res } from 'next';
import { requirePermissions } from 'api-utils/auth';
import { ServerException } from 'api-utils/common';
import db from 'api-utils/db';
import { EventInDb, eventsCollectionName } from 'data/event';
import { PermissionCategory, eventPrivilege } from 'utils/permissions';
import { revalidateEventsPage } from './utils';

const deleteEvent = async (req: Req, res: Res) => {
  await requirePermissions({ [PermissionCategory.EVENT]: eventPrivilege.READ_WRITE }, req);

  const { id } = req.query as { id: string };

  const event = await db.findOne<EventInDb>(eventsCollectionName, { _id: new ObjectId(id) });
  if (!event) throw new ServerException(404);

  await db.remove<EventInDb>(eventsCollectionName, id);

  res.status(200).end();

  revalidateEventsPage(res);
};

export default deleteEvent;
