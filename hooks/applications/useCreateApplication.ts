import axios from 'axios';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { CreateApplicationData } from 'data/application';
import { getMessageFromError } from 'utils/error';
import { queryClient, QueryKeys } from 'utils/queryClient';
import { APIRoute } from 'utils/routes';
import { displayErrorToast, displaySuccessToast } from 'utils/toast';

const createApplicationOnServer = async (applicationData: CreateApplicationData) => {
  await axios.post(`${APIRoute.APPLICATIONS}`, applicationData);
};

const useCreateApplication = ({
  onSuccess,
}: {
  onSuccess?: UseMutationOptions<void, unknown, CreateApplicationData>['onSuccess'];
}) => {
  const { mutate: createEvent } = useMutation(createApplicationOnServer, {
    onError: error => displayErrorToast({ title: getMessageFromError(error) }),
    onSuccess: (data, variables, context) => {
      displaySuccessToast({ title: 'La candidature a bien été créée.' });
      if (onSuccess) onSuccess(data, variables, context);
    },
    onSettled: () => {
      queryClient.invalidateQueries([QueryKeys.APPLICATIONS]);
      queryClient.invalidateQueries([QueryKeys.APPLICATION_ASSOCIABLE_USERS]);
    },
  });

  return createEvent;
};

export default useCreateApplication;
