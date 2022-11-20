import { ObjectId } from 'bson';
import { NextApiRequest as Req, NextApiResponse as Res } from 'next';
import { requirePermissions } from 'api-utils/auth';
import { ServerException } from 'api-utils/common';
import db from 'api-utils/db';
import { PreambleInDb, Question, rulesQuestionnaireCollectionName } from 'data/rulesQuestionnaire';
import { PermissionCategory, rulesQuestionnairePrivilege } from 'utils/permissions';

const deleteQuestion = async (req: Req, res: Res) => {
  await requirePermissions(
    { [PermissionCategory.RULES_QUESTIONNAIRE]: rulesQuestionnairePrivilege.MANAGE },
    req,
  );

  const { id } = req.query as { id: string };

  const question = await db.findOne<Question<ObjectId> | PreambleInDb>(
    rulesQuestionnaireCollectionName,
    { _id: new ObjectId(id) },
  );
  if (!question) throw new ServerException(404);
  if (question.type === 'preamble') throw new ServerException(400);

  await db.remove<Question<ObjectId>>(rulesQuestionnaireCollectionName, id);

  res.status(200).end();
};

export default deleteQuestion;
