import { ObjectId } from 'bson';
import { NextApiRequest as Req, NextApiResponse as Res } from 'next';
import { requirePermissions } from 'api-utils/auth';
import { isRequiredObjectType, ServerException } from 'api-utils/common';
import db from 'api-utils/db';
import {
  ApplicationInDb,
  applicationsCollectionName,
  ApplicationStatus,
  APPLICATION_STATUS_CHANGE_TO_PERMISSIONS,
} from 'data/application';
import { RoleInDb, rolesCollectionName, SpecialRoleName } from 'data/role';
import { UserInDb, usersCollectionName } from 'data/user';

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

const promoteOrDemote = async (
  userId: ObjectId,
  oldStatus: ApplicationStatus,
  newStatus: ApplicationStatus,
) => {
  const isPromoted = newStatus === ApplicationStatus.PROMOTED;
  const isDemoted = oldStatus === ApplicationStatus.PROMOTED;
  if (isPromoted || isDemoted) {
    const user = await db.findOne<UserInDb>(usersCollectionName, {
      _id: new ObjectId(userId),
    });
    const memberRole = await db.findOne<RoleInDb>(rolesCollectionName, {
      name: SpecialRoleName.MEMBER,
    });
    if (user && memberRole) {
      const isMember = user.roleIds?.some(roleId => roleId.equals(memberRole._id));
      if (isPromoted && !isMember) {
        await db.updateOne<UserInDb>(
          usersCollectionName,
          { _id: new ObjectId(userId) },
          { $push: { roleIds: memberRole._id } },
        );
      } else if (isDemoted && isMember) {
        await db.updateOne<UserInDb>(
          usersCollectionName,
          { _id: new ObjectId(userId) },
          { $pull: { roleIds: memberRole._id } },
        );
      }
    }
  }
};

const setApplicationStatus = async (req: Req, res: Res) => {
  const { id } = req.query as { id: string };

  if (!isUpdateStatusData(req.body)) throw new ServerException(400);
  const newStatus = req.body.status;
  await requirePermissions(APPLICATION_STATUS_CHANGE_TO_PERMISSIONS[newStatus], req);

  const application = await db.findOne<ApplicationInDb>(applicationsCollectionName, {
    _id: new ObjectId(id),
  });
  if (!application) throw new ServerException(404);
  await requirePermissions(APPLICATION_STATUS_CHANGE_TO_PERMISSIONS[application.status], req);

  if (application.status === newStatus) throw new ServerException(409);

  const result = await db.updateOne<ApplicationInDb>(
    applicationsCollectionName,
    { _id: new ObjectId(id) },
    { $set: { status: newStatus } },
  );
  if (!result.ok) throw new ServerException(500);

  if ('userId' in application) promoteOrDemote(application.userId, application.status, newStatus);

  res.status(200).end();
};

export default setApplicationStatus;
