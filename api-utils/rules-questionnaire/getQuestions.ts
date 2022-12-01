import { ObjectId } from 'bson';
import { NextApiRequest as Req, NextApiResponse as Res } from 'next';
import db from 'api-utils/db';
import {
  PreambleInDb,
  Question,
  QuestionPositionType,
  rulesQuestionnaireCollectionName,
  RulesQuestionnaireQuestionTypeObjectInDb,
} from 'data/rulesQuestionnaire';

const isPreambleObject = (
  rulesQuestionnaireObjectInDb: PreambleInDb | RulesQuestionnaireQuestionTypeObjectInDb,
): rulesQuestionnaireObjectInDb is PreambleInDb =>
  'type' in rulesQuestionnaireObjectInDb && rulesQuestionnaireObjectInDb.type === 'preamble';
const isQuestionObjectOfGivenPositionType =
  (positionType: QuestionPositionType) =>
  (
    rulesQuestionnaireObjectInDb: PreambleInDb | RulesQuestionnaireQuestionTypeObjectInDb,
  ): rulesQuestionnaireObjectInDb is RulesQuestionnaireQuestionTypeObjectInDb =>
    !isPreambleObject(rulesQuestionnaireObjectInDb) &&
    rulesQuestionnaireObjectInDb.positionType === positionType;

const getQuestions = async (req: Req, res: Res) => {
  const questionObjects = await db.find<PreambleInDb | RulesQuestionnaireQuestionTypeObjectInDb>(
    rulesQuestionnaireCollectionName,
  );

  const preambleObject = questionObjects.find<PreambleInDb>(isPreambleObject);
  const preamble = preambleObject?.label ?? '';

  const questions = Object.values(QuestionPositionType).reduce<{
    [key in QuestionPositionType]: Question<ObjectId>[];
  }>(
    (acc, questionPositionType) => ({
      ...acc,
      [questionPositionType]:
        questionObjects.find<RulesQuestionnaireQuestionTypeObjectInDb>(
          isQuestionObjectOfGivenPositionType(questionPositionType),
        )?.questions ?? [],
    }),
    {} as { [key in QuestionPositionType]: Question<ObjectId>[] },
  );

  res.status(200).json({ preamble, ...questions });
};

export default getQuestions;
