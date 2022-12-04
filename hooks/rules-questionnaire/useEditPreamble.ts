import axios from 'axios';
import useOptimisticMutation from 'hooks/useOptimisticMutation';
import { QueryKeys } from 'utils/queryClient';
import { APIRoute } from 'utils/routes';
import { Callback } from 'utils/types';

const editPreambleOnServer = async (newPreamble: string) => {
  const { data } = await axios.put(`${APIRoute.RULES_QUESTIONNAIRE}/preamble`, {
    preamble: newPreamble,
  });
  return data;
};

const useEditPreamble = ({ onSuccess }: { onSuccess: Callback }) => {
  const editPreamble = useOptimisticMutation(
    QueryKeys.RULES_QUESTIONS,
    editPreambleOnServer,
    (previousQuestionnaire, newPreamble) => ({
      ...previousQuestionnaire,
      preamble: newPreamble,
    }),
    'Le préambule a bien été modifié.',
    { onSuccess },
  );

  return editPreamble;
};

export default useEditPreamble;
