import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { GeneratedQuestionAndAnswer } from 'data/application';
import { getMessageFromError } from 'utils/error';
import { queryClient, QueryKeys } from 'utils/queryClient';
import { APIRoute } from 'utils/routes';
import { displayErrorToast } from 'utils/toast';
import { Callback } from 'utils/types';

const saveQuestionnaireOnServer = async (newQuestionnaireAnswers: GeneratedQuestionAndAnswer[]) => {
  await axios.patch(`${APIRoute.APPLICATIONS}/me`, {
    questionnaireAnswers: newQuestionnaireAnswers,
  });
};

const useSaveMyQuestionnaire = ({ onSuccess }: { onSuccess: Callback }) => {
  const { mutate: saveMyQuestionnaire } = useMutation(saveQuestionnaireOnServer, {
    onError: error => displayErrorToast({ title: getMessageFromError(error) }),
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.MY_APPLICATION]);
      onSuccess();
    },
  });

  return saveMyQuestionnaire;
};

export default useSaveMyQuestionnaire;
