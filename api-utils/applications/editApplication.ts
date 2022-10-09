import { ObjectId } from 'bson';
import { DateTime } from 'luxon';
import { NextApiRequest as Req, NextApiResponse as Res } from 'next';
import { getSession } from 'next-auth/react';
import { requirePermissions } from 'api-utils/auth';
import { ServerException } from 'api-utils/common';
import db from 'api-utils/db';
import {
  ApplicationInDb,
  applicationsCollectionName,
  isCreateApplicationDataWithUserId,
} from 'data/application';
import { UserInDb, usersCollectionName } from 'data/user';
import { PermissionCategory, applicationPrivilege } from 'utils/permissions';
import {
  isCreateApplicationData,
  isValidCreateApplicationData,
  shortenApplicationTextProperties,
} from './utils';

const editApplication = async (req: Req, res: Res) => {
  const { id } = req.query as { id: string };

  const application = await db.findOne<ApplicationInDb>(applicationsCollectionName, {
    _id: new ObjectId(id),
  });
  if (!application) throw new ServerException(404);

  const session = await getSession({ req });
  const isOwnApplication =
    'userId' in application &&
    application.userId &&
    session?.user._id === application.userId.toString();
  if (!isOwnApplication)
    await requirePermissions(
      { [PermissionCategory.APPLICATION]: applicationPrivilege.MANAGE },
      req,
    );

  const lastComment = application.comments[0];
  const lastCommentIsApplicationEdition = lastComment?.authorId === 'system';

  const applicationCreateData: unknown = req.body;
  if (!isCreateApplicationData(applicationCreateData)) throw new ServerException(400);
  if (!isValidCreateApplicationData(applicationCreateData)) throw new ServerException(400);
  shortenApplicationTextProperties(applicationCreateData);

  const isDataWithUserId = isCreateApplicationDataWithUserId(applicationCreateData);

  if (isDataWithUserId) {
    const user = await db.findOne<UserInDb>(usersCollectionName, {
      _id: new ObjectId(applicationCreateData.userId),
    });
    if (!user) throw new ServerException(404);

    const applicationForSameUser = await db.findOne<ApplicationInDb>(applicationsCollectionName, {
      userId: new ObjectId(applicationCreateData.userId),
      ...('userId' in application && { _id: { $ne: new ObjectId(id) } }),
    });
    if (applicationForSameUser) throw new ServerException(409);
  }

  const newComments = lastCommentIsApplicationEdition
    ? application.comments.map(comment =>
        comment?._id === lastComment._id ? { ...comment, edi: DateTime.now().toISO() } : comment,
      )
    : [
        {
          _id: new ObjectId(),
          body: 'La candidature a été mise à jour.',
          authorId: 'system' as const,
          createdAt: DateTime.now().toISO(),
        },
        ...application.comments,
      ];

  const result = await db.updateOne<ApplicationInDb>(
    applicationsCollectionName,
    { _id: new ObjectId(id) },
    {
      $set: {
        applicationFormAnswer: applicationCreateData.applicationFormAnswer,
        comments: newComments,
        ...(isDataWithUserId
          ? { userId: new ObjectId(applicationCreateData.userId) }
          : { discordName: applicationCreateData.discordName }),
      },
      $unset: isDataWithUserId ? { discordName: '' } : { userId: '' },
    },
  );
  if (!result.ok) throw new ServerException(500);

  res.status(200).end();
};

export default editApplication;
