import { ObjectId } from 'bson';
import { NextApiRequest as Req, NextApiResponse as Res } from 'next';
import { requirePermissions } from 'api-utils/auth';
import { ServerException, updateOneInCollection } from 'api-utils/common';
import db from 'api-utils/db';
import { Question, rulesQuestionnaireCollectionName } from 'data/rulesQuestionnaire';
import { PermissionCategory, rulesQuestionnairePrivilege } from 'utils/permissions';
import { getQuestionFromBody } from './utils';

const editQuestion = async (req: Req, res: Res) => {
  await requirePermissions(
    { [PermissionCategory.RULES_QUESTIONNAIRE]: rulesQuestionnairePrivilege.MANAGE },
    req,
  );

  const { id } = req.query as { id: string };

  const question = await db.findOne<Question<ObjectId>>(rulesQuestionnaireCollectionName, {
    _id: new ObjectId(id),
  });
  if (!question) throw new ServerException(404);

  const newQuestion = getQuestionFromBody(req.body);

  const result = await updateOneInCollection<Question<ObjectId>>(
    rulesQuestionnaireCollectionName,
    id,
    newQuestion,
  );
  if (!result.ok) throw new ServerException(500);

  res.status(200).end();
};

export default editQuestion;
