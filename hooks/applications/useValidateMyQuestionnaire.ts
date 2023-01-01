import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { getMessageFromError } from 'utils/error';
import { queryClient, QueryKeys } from 'utils/queryClient';
import { APIRoute } from 'utils/routes';
import { displayErrorToast, displaySuccessToast } from 'utils/toast';
import { Callback } from 'utils/types';

const validateQuestionnaireOnServer = async () => {
  await axios.patch(`${APIRoute.APPLICATIONS}/me`, { validateQuestionnaire: true });
};

const useValidateMyQuestionnaire = ({ onSuccess }: { onSuccess: Callback }) => {
  const { mutate: validateMyQuestionnaire } = useMutation(validateQuestionnaireOnServer, {
    onError: error => displayErrorToast({ title: getMessageFromError(error) }),
    onSuccess: () => {
      displaySuccessToast({ title: 'Votre candidature a bien été mise à jour.' });
      queryClient.invalidateQueries([QueryKeys.MY_APPLICATION]);
      onSuccess();
    },
  });

  return validateMyQuestionnaire;
};

export default useValidateMyQuestionnaire;
