import { ObjectId } from 'bson';
import { NextApiRequest as Req, NextApiResponse as Res } from 'next';
import { requirePermissions } from 'api-utils/auth';
import { ServerException } from 'api-utils/common';
import db from 'api-utils/db';
import { EventInDb, eventsCollectionName } from 'data/event';
import { eventPrivilege, PermissionCategory } from 'utils/permissions';

const getEvent = async (req: Req, res: Res) => {
  await requirePermissions({ [PermissionCategory.EVENT]: eventPrivilege.READ }, req);

  const { id } = req.query as { id: string };

  const event = await db.findOne<EventInDb>(eventsCollectionName, {
    _id: new ObjectId(id),
  });
  if (!event) throw new ServerException(404);

  res.status(200).json(event);
};

export default getEvent;
