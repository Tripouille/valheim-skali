import { ObjectId } from 'bson';
import { DateTime } from 'luxon';
import { NextApiRequest as Req, NextApiResponse as Res } from 'next';
import { requirePermissions } from 'api-utils/auth';
import { ServerException } from 'api-utils/common';
import db from 'api-utils/db';
import { ApplicationInDb, applicationsCollectionName } from 'data/application';
import { PermissionCategory, applicationPrivilege } from 'utils/permissions';
import { isCreateApplicationData, shortenApplicationTextProperties } from './utils';

const editApplication = async (req: Req, res: Res) => {
  await requirePermissions({ [PermissionCategory.APPLICATION]: applicationPrivilege.MANAGE }, req);

  const { id } = req.query as { id: string };

  const application = await db.findOne<ApplicationInDb>(applicationsCollectionName, {
    _id: new ObjectId(id),
  });
  if (!application) throw new ServerException(404);
  const lastComment = application.comments[0];
  const lastCommentIsApplicationEdition = lastComment?.authorId === 'system';

  const applicationCreateData: unknown = req.body;
  if (!isCreateApplicationData(applicationCreateData)) throw new ServerException(400);
  shortenApplicationTextProperties(applicationCreateData);

  const newComments = lastCommentIsApplicationEdition
    ? application.comments.map(comment =>
        comment?._id === lastComment._id
          ? { ...comment, createdAt: DateTime.now().toISO() }
          : comment,
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
        discordName: applicationCreateData.discordName,
        comments: newComments,
      },
    },
  );
  if (!result.ok) throw new ServerException(500);

  res.status(200).json(result.value);
};

export default editApplication;
