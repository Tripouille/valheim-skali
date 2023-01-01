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
  ApplicationSystemComment,
  GeneratedQuestionAndAnswer,
} from 'data/application';
import { isFilled } from 'utils/validation';
import { getApplicationCommentsWithNewOrEditedSystemComment } from './utils';

const checkQuestionnaireAnswers = (questionnaire: GeneratedQuestionAndAnswer[]) => {
  for (const question of questionnaire) {
    if (question.type === 'simple') {
      if (typeof question.answer !== 'string' || !isFilled(question.answer))
        throw new ServerException(400);
    } else if (question.type === 'long') {
      if (typeof question.answer !== 'string' || !isFilled(question.answer))
        throw new ServerException(400);
    } else if (question.type === 'single-choice') {
      if (typeof question.answer !== 'string') throw new ServerException(400);
      if (!question.options.includes(question.answer)) throw new ServerException(400);
    } else if (question.type === 'multiple-choice') {
      if (!Array.isArray(question.answer)) throw new ServerException(400);
      for (const answer of question.answer) {
        if (typeof answer !== 'string') throw new ServerException(400);
        if (!question.options.includes(answer)) throw new ServerException(400);
      }
    }
  }
};

const validateMyQuestionnaire = async (req: Req, res: Res) => {
  const session = await getSession({ req });
  if (!session?.user._id) throw new ServerException(401);

  const application = await db.findOne<ApplicationBaseWithUserId<ObjectId>>(
    applicationsCollectionName,
    { userId: new ObjectId(session.user._id) },
  );
  if (!application || !application.questionnaire) throw new ServerException(404);
  if (application.status !== ApplicationStatus.FILLING_QUESTIONNAIRE)
    throw new ServerException(409);

  checkQuestionnaireAnswers(application.questionnaire.questionsWithAnswers);

  const newComments = getApplicationCommentsWithNewOrEditedSystemComment(
    application,
    ApplicationSystemComment.QUESTIONNAIRE_FILLED,
  );

  const result = await db.updateOne<ApplicationInDb>(
    applicationsCollectionName,
    { userId: new ObjectId(session.user._id) },
    { $set: { status: ApplicationStatus.WAITING_FOR_APPOINTMENT, comments: newComments } },
  );
  if (!result.ok) throw new ServerException(500);

  res.status(200).end();
};

export default validateMyQuestionnaire;
