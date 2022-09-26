import { ObjectId } from 'bson';
import { DateTime } from 'luxon';
import { NextApiRequest as Req, NextApiResponse as Res } from 'next';
import { requirePermissions } from 'api-utils/auth';
import { ServerException } from 'api-utils/common';
import db from 'api-utils/db';
import {
  ApplicationBaseWithDiscordName,
  ApplicationInDb,
  applicationsCollectionName,
  ApplicationStatus,
} from 'data/application';
import { PermissionCategory, applicationPrivilege } from 'utils/permissions';
import { isCreateApplicationData, shortenApplicationTextProperties } from './utils';

const createApplication = async (req: Req, res: Res) => {
  await requirePermissions({ [PermissionCategory.APPLICATION]: applicationPrivilege.MANAGE }, req);

  const applicationCreateData: unknown = req.body;
  if (!isCreateApplicationData(applicationCreateData)) throw new ServerException(400);
  shortenApplicationTextProperties(applicationCreateData);

  const newApplication: Omit<ApplicationBaseWithDiscordName<ObjectId>, '_id'> = {
    ...applicationCreateData,
    comments: [],
    status: ApplicationStatus.WAITING_FOR_APPOINTMENT,
    createdAt: DateTime.now().toISO(),
  };

  const newApplicationId = await db.insert<ApplicationInDb>(
    applicationsCollectionName,
    newApplication,
  );

  res.status(201).json({ ...newApplication, _id: newApplicationId });
};

export default createApplication;
