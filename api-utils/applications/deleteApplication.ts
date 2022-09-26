import { ObjectId } from 'bson';
import { NextApiRequest as Req, NextApiResponse as Res } from 'next';
import { requirePermissions } from 'api-utils/auth';
import { ServerException } from 'api-utils/common';
import db from 'api-utils/db';
import { ApplicationInDb, applicationsCollectionName } from 'data/application';
import { PermissionCategory, applicationPrivilege } from 'utils/permissions';

const deleteApplication = async (req: Req, res: Res) => {
  await requirePermissions({ [PermissionCategory.APPLICATION]: applicationPrivilege.ADMIN }, req);

  const { id } = req.query as { id: string };

  const application = await db.findOne<ApplicationInDb>(applicationsCollectionName, {
    _id: new ObjectId(id),
  });
  if (!application) throw new ServerException(404);

  await db.remove<ApplicationInDb>(applicationsCollectionName, id);

  res.status(200).end();
};

export default deleteApplication;
