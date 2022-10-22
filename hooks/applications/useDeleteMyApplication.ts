import axios from 'axios';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import { Application } from 'data/application';
import { getMessageFromError } from 'utils/error';
import { queryClient, QueryKeys } from 'utils/queryClient';
import { APIRoute, getRoute } from 'utils/routes';
import { displayErrorToast, displaySuccessToast } from 'utils/toast';

const deleteMyApplicationOnServer = (deletedApplication?: Application) => async () => {
  await axios.delete(`${APIRoute.APPLICATIONS}/${deletedApplication?._id}`);
};

const useDeleteMyApplication = (deletedApplication?: Application) => {
  const router = useRouter();

  const { mutate: deleteApplication } = useMutation(
    deleteMyApplicationOnServer(deletedApplication),
    {
      onError: error => displayErrorToast({ title: getMessageFromError(error) }),
      onSuccess: () => {
        displaySuccessToast({ title: 'Votre candidature a bien été supprimée.' });
        queryClient.invalidateQueries([QueryKeys.MY_APPLICATION]);
        router.push(getRoute(''));
      },
    },
  );

  return deleteApplication;
};

export default useDeleteMyApplication;
