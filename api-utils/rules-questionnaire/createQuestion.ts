import { ObjectId } from 'bson';
import { NextApiRequest as Req, NextApiResponse as Res } from 'next';
import { requirePermissions } from 'api-utils/auth';
import db from 'api-utils/db';
import { Question, rulesQuestionnaireCollectionName } from 'data/rulesQuestionnaire';
import { PermissionCategory, rulesQuestionnairePrivilege } from 'utils/permissions';
import { getQuestionFromBody } from './utils';

const createQuestion = async (req: Req, res: Res) => {
  await requirePermissions(
    { [PermissionCategory.RULES_QUESTIONNAIRE]: rulesQuestionnairePrivilege.MANAGE },
    req,
  );

  const newQuestion = getQuestionFromBody(req.body);

  const newQuestionId = await db.insert<Question<ObjectId>>(
    rulesQuestionnaireCollectionName,
    newQuestion,
  );

  res.status(201).json({ ...newQuestion, _id: newQuestionId });
};

export default createQuestion;
