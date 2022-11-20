import { ObjectId } from 'bson';
import { NextApiRequest as Req, NextApiResponse as Res } from 'next';
import db from 'api-utils/db';
import { PreambleInDb, Question, rulesQuestionnaireCollectionName } from 'data/rulesQuestionnaire';

const getQuestions = async (req: Req, res: Res) => {
  const questions = await db.find<Question<ObjectId> | PreambleInDb>(
    rulesQuestionnaireCollectionName,
  );

  const preamble = questions.find(question => question.type === 'preamble')?.label;
  const questionsWithoutPreambule = questions.filter(question => question.type !== 'preamble');

  res.status(200).json({ preamble, questions: questionsWithoutPreambule });
};

export default getQuestions;
