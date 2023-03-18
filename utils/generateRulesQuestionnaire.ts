import { ObjectId } from 'bson';
import { sampleSize, shuffle } from 'lodash';
import { GeneratedRulesQuestionnaire } from 'data/application';
import { Question, QuestionPositionType, RulesQuestionnaire } from 'data/rulesQuestionnaire';

const sortGeneratedQuestions = <T extends string | ObjectId>(
  questions: Question<T>[],
  questionsByPositionType: Pick<RulesQuestionnaire<T>, QuestionPositionType>,
) =>
  questions.sort((q1, q2) => {
    if (q1.positionType !== q2.positionType) {
      if (q1.positionType === QuestionPositionType.BEGINNING) return -1;
      if (q2.positionType === QuestionPositionType.BEGINNING) return 1;
      if (q1.positionType === QuestionPositionType.END) return 1;
      if (q2.positionType === QuestionPositionType.END) return -1;
    }
    if (q1.positionType === QuestionPositionType.BEGINNING) {
      return (
        questionsByPositionType.beginning.indexOf(q1) -
        questionsByPositionType.beginning.indexOf(q2)
      );
    } else if (q1.positionType === QuestionPositionType.END) {
      return questionsByPositionType.end.indexOf(q1) - questionsByPositionType.end.indexOf(q2);
    }
    return 0;
  });

const generateRulesQuestionnaire = <T extends string | ObjectId>(
  rulesQuestionaire: RulesQuestionnaire<T>,
): GeneratedRulesQuestionnaire => {
  const { preamble, questionsNumber, ...questionsByPositionType } = rulesQuestionaire;

  const randomQuestions = shuffle(questionsByPositionType.random);
  const allQuestions = questionsByPositionType.beginning
    .concat(randomQuestions)
    .concat(questionsByPositionType.end);

  const alwaysIncludedQuestions: Question<T>[] = [];
  const nonAlwaysIncludedQuestions: Question<T>[] = [];
  for (const question of allQuestions) {
    if (question.alwaysIncluded) {
      alwaysIncludedQuestions.push(question);
    } else {
      nonAlwaysIncludedQuestions.push(question);
    }
  }

  const nonAlwaysIncludedQuestionsNumberToPick = Math.max(
    questionsNumber - alwaysIncludedQuestions.length,
    0,
  );
  const nonAlwaysIncludedQuestionsSample = sampleSize(
    nonAlwaysIncludedQuestions,
    nonAlwaysIncludedQuestionsNumberToPick,
  );

  const questions = alwaysIncludedQuestions.concat(nonAlwaysIncludedQuestionsSample);
  sortGeneratedQuestions(questions, questionsByPositionType);
  const questionWithOnlyNeededFields = questions.map(question => {
    const { _id: id, positionType, alwaysIncluded, ...rest } = question;
    return rest;
  });

  return { preamble, questionsWithAnswers: questionWithOnlyNeededFields };
};

export default generateRulesQuestionnaire;