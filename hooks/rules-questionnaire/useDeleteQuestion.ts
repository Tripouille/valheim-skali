import axios from 'axios';
import { QuestionPositionType, RulesQuestionnaire } from 'data/rulesQuestionnaire';
import useOptimisticMutation from 'hooks/useOptimisticMutation';
import { QueryKeys } from 'utils/queryClient';
import { APIRoute } from 'utils/routes';

const deleteQuestionOnServer = (deletedQuestionId?: string) => async () => {
  await axios.delete(`${APIRoute.RULES_QUESTIONNAIRE}/${deletedQuestionId}`);
};

const getUpdatedQuestions =
  (deletedQuestionId?: string) => (previousQuestionnaire: RulesQuestionnaire) => {
    const questionPositionType = Object.values(QuestionPositionType).find(key =>
      previousQuestionnaire[key].find(question => question._id === deletedQuestionId),
    );
    if (!questionPositionType) return previousQuestionnaire;
    return {
      ...previousQuestionnaire,
      [questionPositionType]: [
        ...previousQuestionnaire[questionPositionType].filter(
          question => question._id !== deletedQuestionId,
        ),
      ],
    };
  };

const useDeleteQuestion = (deletedQuestionId?: string) => {
  const deleteQuestion = useOptimisticMutation(
    QueryKeys.RULES_QUESTIONS,
    deleteQuestionOnServer(deletedQuestionId),
    getUpdatedQuestions(deletedQuestionId),
    'La question a bien été supprimée.',
  );

  return deleteQuestion;
};

export default useDeleteQuestion;
