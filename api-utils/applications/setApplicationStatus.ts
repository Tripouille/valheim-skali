import { ObjectId } from 'bson';
import { NextApiRequest as Req, NextApiResponse as Res } from 'next';
import { requirePermissions } from 'api-utils/auth';
import { isRequiredObjectType, ServerException } from 'api-utils/common';
import db from 'api-utils/db';
import {
  ApplicationInDb,
  applicationsCollectionName,
  ApplicationStatus,
  APPLICATION_STATUS_TO_PERMISSIONS,
} from 'data/application';

interface UpdateStatusData {
  status: ApplicationStatus;
}

const updateStatusKeyToValueTypeCheck: Record<keyof UpdateStatusData, (value: unknown) => boolean> =
  {
    status: value =>
      typeof value === 'string' &&
      Object.values(ApplicationStatus).includes(value as ApplicationStatus),
  };

const isUpdateStatusData = (data: unknown): data is UpdateStatusData =>
  isRequiredObjectType(data, updateStatusKeyToValueTypeCheck);

const setApplicationStatus = async (req: Req, res: Res) => {
  const { id } = req.query as { id: string };

  if (!isUpdateStatusData(req.body)) throw new ServerException(400);
  const newStatus = req.body.status;
  await requirePermissions(APPLICATION_STATUS_TO_PERMISSIONS[newStatus], req);

  const application = await db.findOne<ApplicationInDb>(applicationsCollectionName, {
    _id: new ObjectId(id),
  });
  if (!application) throw new ServerException(404);
  await requirePermissions(APPLICATION_STATUS_TO_PERMISSIONS[application.status], req);

  if (application.status === newStatus) throw new ServerException(409);

  const result = await db.updateOne<ApplicationInDb>(
    applicationsCollectionName,
    { _id: new ObjectId(id) },
    { $set: { status: newStatus } },
  );
  if (!result.ok) throw new ServerException(500);

  res.status(200).end();
};

export default setApplicationStatus;
