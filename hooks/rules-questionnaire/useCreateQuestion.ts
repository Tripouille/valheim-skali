import axios from 'axios';
import { CreateQuestionData } from 'data/rulesQuestionnaire';
import useOptimisticMutation from 'hooks/useOptimisticMutation';
import { QueryKeys } from 'utils/queryClient';
import { APIRoute } from 'utils/routes';
import { Callback } from 'utils/types';

const createQuestionOnServer = async (createQuestionData: CreateQuestionData) => {
  const { data } = await axios.post(APIRoute.RULES_QUESTIONNAIRE, createQuestionData);
  return data;
};

const useCreateQuestion = ({ onSuccess }: { onSuccess: Callback }) => {
  const createQuestion = useOptimisticMutation(
    QueryKeys.RULES_QUESTIONS,
    createQuestionOnServer,
    ({ preamble, questions: previousQuestions }, newQuestion) => ({
      preamble,
      questions: [...(previousQuestions ?? []), { ...newQuestion, _id: 'new' }],
    }),
    'La question a bien été ajoutée.',
    { onSuccess },
  );

  return createQuestion;
};

export default useCreateQuestion;
