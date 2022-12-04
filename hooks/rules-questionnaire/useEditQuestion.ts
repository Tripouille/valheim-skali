import axios from 'axios';
import { CreateQuestionData } from 'data/rulesQuestionnaire';
import useOptimisticMutation from 'hooks/useOptimisticMutation';
import { QueryKeys } from 'utils/queryClient';
import { APIRoute } from 'utils/routes';
import { Callback } from 'utils/types';

const editQuestionOnServer = (questionId: string) => async (newQuestion: CreateQuestionData) => {
  const { data } = await axios.put(`${APIRoute.RULES_QUESTIONNAIRE}/${questionId}`, newQuestion);
  return data;
};

const useEditQuestion = (questionId: string, { onSuccess }: { onSuccess: Callback }) => {
  const editQuestion = useOptimisticMutation(
    QueryKeys.RULES_QUESTIONS,
    editQuestionOnServer(questionId),
    (previousQuestionnaire, newQuestion) => ({
      ...previousQuestionnaire,
      [newQuestion.positionType]: previousQuestionnaire[newQuestion.positionType].map(question =>
        question._id === questionId ? newQuestion : question,
      ),
    }),
    'La question a bien été modifiée.',
    { onSuccess },
  );

  return editQuestion;
};

export default useEditQuestion;
