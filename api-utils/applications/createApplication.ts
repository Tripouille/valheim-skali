import { ObjectId } from 'bson';
import { DateTime } from 'luxon';
import { NextApiRequest as Req, NextApiResponse as Res } from 'next';
import { getSession } from 'next-auth/react';
import { requirePermissions } from 'api-utils/auth';
import { ServerException } from 'api-utils/common';
import db from 'api-utils/db';
import getGeneratedRulesQuestionnaire from 'api-utils/rules-questionnaire/generateRulesQuestionnaire';
import {
  ApplicationInDb,
  applicationsCollectionName,
  ApplicationStatus,
  isCreateApplicationDataWithUserId,
} from 'data/application';
import { usersCollectionName } from 'data/user';
import { PermissionCategory, applicationPrivilege } from 'utils/permissions';
import { getApplicationUser, getCreateApplicationData } from './utils';

const createApplication = async (req: Req, res: Res) => {
  const applicationCreateData = getCreateApplicationData(req.body);

  const isDataWithUserId = isCreateApplicationDataWithUserId(applicationCreateData);

  // For non managers, allow only own application
  const session = await getSession({ req });
  const isOwnApplication = isDataWithUserId && session?.user._id === applicationCreateData.userId;
  if (!isOwnApplication)
    await requirePermissions(
      { [PermissionCategory.APPLICATION]: applicationPrivilege.MANAGE },
      req,
    );

  if (isDataWithUserId) {
    const user = await getApplicationUser(applicationCreateData);
    if (user) {
      const applicationForSameUser = await db.findOne<ApplicationInDb>(applicationsCollectionName, {
        userId: new ObjectId(applicationCreateData.userId),
      });
      if (applicationForSameUser) throw new ServerException(409);

      await db.updateOne(
        usersCollectionName,
        { _id: user._id },
        { $set: { nameInGame: applicationCreateData.applicationFormAnswer.nameInGame } },
      );
    }
  }

  const newApplication: Omit<ApplicationInDb, '_id'> = {
    applicationFormAnswer: applicationCreateData.applicationFormAnswer,
    comments: [],
    status: ApplicationStatus.FILLING_QUESTIONNAIRE,
    createdAt: DateTime.now().toISO(),
    ...(isDataWithUserId
      ? {
          userId: new ObjectId(applicationCreateData.userId),
          questionnaire: await getGeneratedRulesQuestionnaire(),
        }
      : { discordName: applicationCreateData.discordName }),
  };

  const newApplicationId = await db.insert(applicationsCollectionName, newApplication);

  res.status(201).json({
    ...newApplication,
    _id: newApplicationId,
    ...(isOwnApplication && {
      discordName: session.user.name,
      discordImageUrl: session.user.image,
    }),
  });
};

export default createApplication;