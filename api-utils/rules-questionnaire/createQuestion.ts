import { ObjectId } from 'bson';
import { NextApiRequest as Req, NextApiResponse as Res } from 'next';
import { requirePermissions } from 'api-utils/auth';
import db from 'api-utils/db';
import {
  rulesQuestionnaireCollectionName,
  RulesQuestionnaireQuestionTypeObjectInDb,
} from 'data/rulesQuestionnaire';
import { PermissionCategory, rulesQuestionnairePrivilege } from 'utils/permissions';
import { getQuestionFromBody } from './utils';

const createQuestion = async (req: Req, res: Res) => {
  await requirePermissions(
    { [PermissionCategory.RULES_QUESTIONNAIRE]: rulesQuestionnairePrivilege.MANAGE },
    req,
  );

  const newQuestion = await getQuestionFromBody(req.body);

  const newQuestionId = await db.updateOne<RulesQuestionnaireQuestionTypeObjectInDb>(
    rulesQuestionnaireCollectionName,
    { positionType: newQuestion.positionType },
    { $push: { questions: { _id: new ObjectId(), ...newQuestion } } },
  );

  res.status(201).json({ ...newQuestion, _id: newQuestionId });
};

export default createQuestion;
