import axios from 'axios';
import { Question } from 'data/rulesQuestionnaire';
import useOptimisticMutation from 'hooks/useOptimisticMutation';
import { QueryKeys } from 'utils/queryClient';
import { APIRoute } from 'utils/routes';

const moveQuestionOnServer = (question: Question) => async (newPosition: number) => {
  await axios.patch(`${APIRoute.RULES_QUESTIONNAIRE}/${question._id}`, {
    positionType: question.positionType,
    position: newPosition,
  });
};

const useMoveQuestion = (question: Question) => {
  const moveQuestion = useOptimisticMutation(
    QueryKeys.RULES_QUESTIONS,
    moveQuestionOnServer(question),
    (previousQuestionnaire, newPosition) => {
      const newPositionTypeQuestions = [...previousQuestionnaire[question.positionType]];
      if (newPosition >= newPositionTypeQuestions.length) return previousQuestionnaire;
      const oldPosition = newPositionTypeQuestions.findIndex(q => q._id === question._id);
      const swappedQuestion = newPositionTypeQuestions[newPosition] as Question;
      newPositionTypeQuestions[oldPosition] = swappedQuestion;
      newPositionTypeQuestions[newPosition] = question;
      return {
        ...previousQuestionnaire,
        [question.positionType]: newPositionTypeQuestions,
      };
    },
    'La question a bien été bougée.',
  );

  return moveQuestion;
};

export default useMoveQuestion;
