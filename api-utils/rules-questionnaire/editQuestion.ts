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
import { getQuestionFromBody } from './utils';

const editQuestion = async (req: Req, res: Res) => {
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
  const oldQuestion = questionTypeObject.questions.find(q => q._id.toString() === id);
  if (!oldQuestion) throw new ServerException(404);

  const newQuestion = await getQuestionFromBody(req.body);

  if (oldQuestion.positionType === newQuestion.positionType) {
    const result = await db.updateOne<RulesQuestionnaireQuestionTypeObjectInDb>(
      rulesQuestionnaireCollectionName,
      { positionType: newQuestion.positionType, 'questions._id': new ObjectId(id) },
      { $set: { 'questions.$': { _id: new ObjectId(id), ...newQuestion } } },
    );
    if (!result.ok) throw new ServerException(500);
  } else {
    let result = await db.updateOne<RulesQuestionnaireQuestionTypeObjectInDb>(
      rulesQuestionnaireCollectionName,
      { positionType: newQuestion.positionType },
      { $push: { questions: { _id: new ObjectId(id), ...newQuestion } } },
    );
    if (!result.ok) throw new ServerException(500);
    result = await db.updateOne<RulesQuestionnaireQuestionTypeObjectInDb>(
      rulesQuestionnaireCollectionName,
      { positionType: oldQuestion.positionType },
      { $pull: { questions: { _id: new ObjectId(id) } } },
    );
    if (!result.ok) throw new ServerException(500);
  }

  res.status(200).end();
};

export default editQuestion;
