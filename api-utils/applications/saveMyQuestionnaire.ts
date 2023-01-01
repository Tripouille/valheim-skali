import { ObjectId } from 'bson';
import { NextApiRequest as Req, NextApiResponse as Res } from 'next';
import { getSession } from 'next-auth/react';
import { ServerException } from 'api-utils/common';
import db from 'api-utils/db';
import {
  ApplicationBaseWithUserId,
  ApplicationInDb,
  applicationsCollectionName,
  ApplicationStatus,
  GeneratedQuestionAndAnswer,
} from 'data/application';

const checkQuestionnaireIsTheSame = (
  oldQuestionnaire: GeneratedQuestionAndAnswer[],
  newQuestionnaire: GeneratedQuestionAndAnswer[],
) => {
  if (oldQuestionnaire.length !== newQuestionnaire.length) throw new ServerException(409);
  for (let i = 0; i < oldQuestionnaire.length; i++) {
    const oldQuestion = oldQuestionnaire[i] as GeneratedQuestionAndAnswer;
    const newQuestion = newQuestionnaire[i] as GeneratedQuestionAndAnswer;
    if (oldQuestion.label !== newQuestion.label) throw new ServerException(409);
    if (oldQuestion.type !== newQuestion.type) throw new ServerException(409);
    if (newQuestion.type === 'single-choice' && oldQuestion.type === 'single-choice') {
      if (oldQuestion.options.length !== newQuestion.options.length) throw new ServerException(409);
      for (let j = 0; j < oldQuestion.options.length; j++) {
        if (oldQuestion.options[j] !== newQuestion.options[j]) throw new ServerException(409);
      }
    } else if (newQuestion.type === 'multiple-choice' && oldQuestion.type === 'multiple-choice') {
      if (oldQuestion.options.length !== newQuestion.options.length) throw new ServerException(409);
      for (let j = 0; j < oldQuestion.options.length; j++) {
        if (oldQuestion.options[j] !== newQuestion.options[j]) throw new ServerException(409);
      }
    }
  }
};

const checkQuestionnaireAnswers = (questionnaire: GeneratedQuestionAndAnswer[]) => {
  for (const question of questionnaire) {
    if (question.type === 'simple') {
      if (typeof question.answer !== 'string') throw new ServerException(400);
    } else if (question.type === 'long') {
      if (typeof question.answer !== 'string') throw new ServerException(400);
    } else if (question.type === 'single-choice') {
      if (typeof question.answer !== 'string') throw new ServerException(400);
      if (question.answer.length > 0 && !question.options.includes(question.answer))
        throw new ServerException(400);
    } else if (question.type === 'multiple-choice') {
      if (!Array.isArray(question.answer)) throw new ServerException(400);
      for (const answer of question.answer) {
        if (typeof answer !== 'string') throw new ServerException(400);
        if (!question.options.includes(answer)) throw new ServerException(400);
      }
    }
  }
};

const saveMyQuestionnaire = async (req: Req, res: Res) => {
  const session = await getSession({ req });
  if (!session?.user._id) throw new ServerException(401);

  const application = await db.findOne<ApplicationBaseWithUserId<ObjectId>>(
    applicationsCollectionName,
    { userId: new ObjectId(session.user._id) },
  );
  if (!application || !application.questionnaire) throw new ServerException(404);
  if (application.status !== ApplicationStatus.FILLING_QUESTIONNAIRE)
    throw new ServerException(409);

  const newQuestionnaireAnswers = req.body?.questionnaireAnswers;
  if (!newQuestionnaireAnswers) throw new ServerException(400);

  checkQuestionnaireIsTheSame(
    application.questionnaire.questionsWithAnswers,
    newQuestionnaireAnswers,
  );
  checkQuestionnaireAnswers(newQuestionnaireAnswers);

  const result = await db.updateOne<ApplicationInDb>(
    applicationsCollectionName,
    { userId: new ObjectId(session.user._id) },
    {
      $set: {
        'questionnaire.questionsWithAnswers': newQuestionnaireAnswers,
      },
    },
  );
  if (!result.ok) throw new ServerException(500);

  res.status(200).end();
};

export default saveMyQuestionnaire;
