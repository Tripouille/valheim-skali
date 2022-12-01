import { ObjectId } from 'bson';
import { NextApiRequest as Req, NextApiResponse as Res } from 'next';
import { requirePermissions } from 'api-utils/auth';
import { ServerException } from 'api-utils/common';
import db from 'api-utils/db';
import {
  QuestionPositionType,
  rulesQuestionnaireCollectionName,
  RulesQuestionnaireQuestionTypeObjectInDb,
} from 'data/rulesQuestionnaire';
import { PermissionCategory, rulesQuestionnairePrivilege } from 'utils/permissions';

const moveQuestion = async (req: Req, res: Res) => {
  await requirePermissions(
    { [PermissionCategory.RULES_QUESTIONNAIRE]: rulesQuestionnairePrivilege.MANAGE },
    req,
  );

  // Retrieve and check question
  const { id } = req.query as { id: string };

  const questionTypeObject = await db.findOne<RulesQuestionnaireQuestionTypeObjectInDb>(
    rulesQuestionnaireCollectionName,
    { 'questions._id': new ObjectId(id) },
  );
  if (!questionTypeObject) throw new ServerException(404);
  const question = questionTypeObject.questions.find(q => q._id.toString() === id);
  if (!question) throw new ServerException(404);
  if (
    question.positionType === QuestionPositionType.RANDOM ||
    question.positionType !== req.body?.positionType
  ) {
    throw new ServerException(409);
  }

  // Retrieve and check new position
  const newPosition = req.body?.position;
  if (
    newPosition == null ||
    newPosition < 0 ||
    newPosition >= questionTypeObject.questions.length
  ) {
    throw new ServerException(400);
  }

  // Move question in database
  const pullResult = await db.updateOne<RulesQuestionnaireQuestionTypeObjectInDb>(
    rulesQuestionnaireCollectionName,
    { positionType: question.positionType },
    { $pull: { questions: { _id: new ObjectId(id) } } },
  );
  if (!pullResult.ok) throw new ServerException(500);
  const pushResult = await db.updateOne<RulesQuestionnaireQuestionTypeObjectInDb>(
    rulesQuestionnaireCollectionName,
    { positionType: question.positionType },
    { $push: { questions: { $each: [question], $position: newPosition } } },
  );
  if (!pushResult.ok) throw new ServerException(500);

  res.status(200).end();
};

export default moveQuestion;
