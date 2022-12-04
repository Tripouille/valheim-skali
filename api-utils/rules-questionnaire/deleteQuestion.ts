import { ObjectId } from 'bson';
import { NextApiRequest as Req, NextApiResponse as Res } from 'next';
import { requirePermissions } from 'api-utils/auth';
import { ServerException } from 'api-utils/common';
import db from 'api-utils/db';
import {
  rulesQuestionnaireCollectionName,
  RulesQuestionnaireQuestionTypeObjectInDb,
} from 'data/rulesQuestionnaire';
import { PermissionCategory, rulesQuestionnairePrivilege } from 'utils/permissions';

const deleteQuestion = async (req: Req, res: Res) => {
  await requirePermissions(
    { [PermissionCategory.RULES_QUESTIONNAIRE]: rulesQuestionnairePrivilege.MANAGE },
    req,
  );

  const { id } = req.query as { id: string };

  const questionTypeObject = await db.findOne<RulesQuestionnaireQuestionTypeObjectInDb>(
    rulesQuestionnaireCollectionName,
    { 'questions._id': new ObjectId(id) },
  );
  if (!questionTypeObject) throw new ServerException(404);

  const result = await db.updateOne<RulesQuestionnaireQuestionTypeObjectInDb>(
    rulesQuestionnaireCollectionName,
    { 'questions._id': new ObjectId(id) },
    { $pull: { questions: { _id: new ObjectId(id) } } },
  );
  if (!result.ok) throw new ServerException(500);

  res.status(200).end();
};

export default deleteQuestion;
