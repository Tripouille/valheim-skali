import { ObjectId } from 'bson';
import { DateTime } from 'luxon';
import { NextApiRequest as Req, NextApiResponse as Res } from 'next';
import { getSession } from 'next-auth/react';
import { requirePermissions } from 'api-utils/auth';
import { isRequiredObjectType, ServerException } from 'api-utils/common';
import db from 'api-utils/db';
import {
  ApplicationInDb,
  applicationsCollectionName,
  APPLICATION_COMMENT_MAX_LENGTH,
  EditApplicationCommentData,
} from 'data/application';
import { applicationPrivilege, PermissionCategory } from 'utils/permissions';

const isEditApplicationCommentData = (data: unknown): data is EditApplicationCommentData =>
  isRequiredObjectType(data, {
    _id: id => typeof id === 'string',
    body: bodyValue => typeof bodyValue === 'string' && bodyValue.length > 0,
  });

const isEditApplicationCommentReqBody = (
  data: unknown,
): data is { comment: EditApplicationCommentData } =>
  isRequiredObjectType(data, { comment: isEditApplicationCommentData });

const editApplicationComment = async (req: Req, res: Res) => {
  await requirePermissions({ [PermissionCategory.APPLICATION]: applicationPrivilege.MANAGE }, req);

  const { id } = req.query as { id: string };

  const application = await db.findOne<ApplicationInDb>(applicationsCollectionName, {
    _id: new ObjectId(id),
  });
  if (!application) throw new ServerException(404);

  const session = await getSession({ req });
  const userId = session?.user._id;
  if (!userId) throw new ServerException(401);

  if (!isEditApplicationCommentReqBody(req.body)) throw new ServerException(400);
  const commentId = req.body.comment._id;
  const newBody = req.body.comment.body.slice(0, APPLICATION_COMMENT_MAX_LENGTH);

  const oldComment = application.comments.find(c => c._id.toString() === commentId);
  if (!oldComment) throw new ServerException(404);

  const editCommentResult = await db.updateOne<ApplicationInDb>(
    applicationsCollectionName,
    { _id: new ObjectId(id), 'comments._id': new ObjectId(commentId) },
    { $set: { 'comments.$.body': newBody, 'comments.$.editedAt': DateTime.now().toISO() } },
  );
  if (!editCommentResult.ok || !editCommentResult.value) throw new ServerException(500);

  res.status(200).end();
};

export default editApplicationComment;
