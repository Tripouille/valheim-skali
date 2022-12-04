import axios from 'axios';
import useOptimisticMutation from 'hooks/useOptimisticMutation';
import { QueryKeys } from 'utils/queryClient';
import { APIRoute } from 'utils/routes';
import { Callback } from 'utils/types';

const editQuestionsNumberOnServer = async (newQuestionsNumber: number) => {
  const { data } = await axios.put(`${APIRoute.RULES_QUESTIONNAIRE}/number`, {
    number: newQuestionsNumber,
  });
  return data;
};

const useEditQuestionsNumber = ({ onSuccess }: { onSuccess: Callback }) => {
  const editPreamble = useOptimisticMutation(
    QueryKeys.RULES_QUESTIONS,
    editQuestionsNumberOnServer,
    (previousQuestionnaire, newQuestionsNumber) => ({
      ...previousQuestionnaire,
      questionsNumber: newQuestionsNumber,
    }),
    'Le nombre de questions a bien été modifié.',
    { onSuccess },
  );

  return editPreamble;
};

export default useEditQuestionsNumber;
