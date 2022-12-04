import { ObjectId } from 'bson';
import { NextApiRequest as Req, NextApiResponse as Res } from 'next';
import db from 'api-utils/db';
import {
  DEFAULT_QUESTIONS_NUMBER,
  Question,
  QuestionPositionType,
  RulesQuestionnaire,
  rulesQuestionnaireCollectionName,
  RulesQuestionnaireConfigInDb,
  RulesQuestionnaireQuestionTypeObjectInDb,
} from 'data/rulesQuestionnaire';

const isConfig = (
  rulesQuestionnaireObjectInDb:
    | RulesQuestionnaireConfigInDb
    | RulesQuestionnaireQuestionTypeObjectInDb,
): rulesQuestionnaireObjectInDb is RulesQuestionnaireConfigInDb =>
  'type' in rulesQuestionnaireObjectInDb && rulesQuestionnaireObjectInDb.type === 'config';
const isQuestionObjectOfGivenPositionType =
  (positionType: QuestionPositionType) =>
  (
    rulesQuestionnaireObjectInDb:
      | RulesQuestionnaireConfigInDb
      | RulesQuestionnaireQuestionTypeObjectInDb,
  ): rulesQuestionnaireObjectInDb is RulesQuestionnaireQuestionTypeObjectInDb =>
    !isConfig(rulesQuestionnaireObjectInDb) &&
    rulesQuestionnaireObjectInDb.positionType === positionType;

const getQuestions = async (req: Req, res: Res) => {
  const questionObjects = await db.find<
    RulesQuestionnaireConfigInDb | RulesQuestionnaireQuestionTypeObjectInDb
  >(rulesQuestionnaireCollectionName);

  const configObject = questionObjects.find<RulesQuestionnaireConfigInDb>(isConfig);
  const preamble = configObject?.preamble ?? '';
  const questionsNumber = configObject?.questionsNumber ?? DEFAULT_QUESTIONS_NUMBER;

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

  const result: RulesQuestionnaire<ObjectId> = { preamble, questionsNumber, ...questions };
  res.status(200).json(result);
};

export default getQuestions;
