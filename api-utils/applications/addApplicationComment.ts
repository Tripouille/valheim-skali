import { ObjectId } from 'bson';
import { DateTime } from 'luxon';
import { NextApiRequest as Req, NextApiResponse as Res } from 'next';
import { getSession } from 'next-auth/react';
import { requirePermissions } from 'api-utils/auth';
import { isRequiredObjectType, ServerException } from 'api-utils/common';
import db from 'api-utils/db';
import {
  AddApplicationCommentData,
  ApplicationComment,
  ApplicationInDb,
  applicationsCollectionName,
  APPLICATION_COMMENT_MAX_LENGTH,
} from 'data/application';
import { applicationPrivilege, PermissionCategory } from 'utils/permissions';

const isAddApplicationCommentData = (data: unknown): data is AddApplicationCommentData =>
  isRequiredObjectType(data, {
    body: bodyValue => typeof bodyValue === 'string' && bodyValue.length > 0,
  });

const isAddApplicationCommentReqBody = (
  data: unknown,
): data is { comment: AddApplicationCommentData } =>
  isRequiredObjectType(data, { comment: isAddApplicationCommentData });

export const getCommentFromReqBody = (
  reqBody: unknown,
  userId: string,
): ApplicationComment<ObjectId> => {
  if (!isAddApplicationCommentReqBody(reqBody)) throw new ServerException(400);

  const comment = {
    body: reqBody.comment.body.slice(0, APPLICATION_COMMENT_MAX_LENGTH),
    _id: new ObjectId(),
    authorId: new ObjectId(userId),
    createdAt: DateTime.now().toISO(),
  };

  return comment;
};

const addApplicationComment = async (req: Req, res: Res) => {
  await requirePermissions({ [PermissionCategory.APPLICATION]: applicationPrivilege.MANAGE }, req);

  const { id } = req.query as { id: string };

  const application = await db.findOne<ApplicationInDb>(applicationsCollectionName, {
    _id: new ObjectId(id),
  });
  if (!application) throw new ServerException(404);

  const session = await getSession({ req });
  const userId = session?.user._id;
  if (!userId) throw new ServerException(401);
  const comment = getCommentFromReqBody(req.body, userId);

  const addCommentResult = await db.updateOne<ApplicationInDb>(
    applicationsCollectionName,
    { _id: new ObjectId(id) },
    {
      $push: {
        comments: {
          $each: [comment],
          $sort: { createdAt: -1 },
        },
      },
    },
  );
  if (!addCommentResult.ok) throw new ServerException(500);

  res.status(200).end();
};

export default addApplicationComment;
