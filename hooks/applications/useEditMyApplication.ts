import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { CreateApplicationData, Application } from 'data/application';
import { getMessageFromError } from 'utils/error';
import { queryClient, QueryKeys } from 'utils/queryClient';
import { APIRoute } from 'utils/routes';
import { displayErrorToast, displaySuccessToast } from 'utils/toast';
import { Callback } from 'utils/types';

const editMyApplicationOnServer =
  (editedApplication: Application | undefined) =>
  async (createApplicationData: CreateApplicationData) => {
    if (editedApplication)
      await axios.put(`${APIRoute.APPLICATIONS}/${editedApplication._id}`, createApplicationData);
  };

const useEditMyApplication = (
  editedApplication: Application | undefined,
  { onSuccess }: { onSuccess: Callback },
) => {
  const { mutate: editApplication } = useMutation(editMyApplicationOnServer(editedApplication), {
    onError: error => displayErrorToast({ title: getMessageFromError(error) }),
    onSuccess: () => {
      displaySuccessToast({ title: 'Votre candidature a bien été modifiée.' });
      queryClient.invalidateQueries([QueryKeys.MY_APPLICATION]);
      if (onSuccess) onSuccess();
    },
  });

  return editApplication;
};

export default useEditMyApplication;
