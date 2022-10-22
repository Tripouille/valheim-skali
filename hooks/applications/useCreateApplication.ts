import axios from 'axios';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { Application, CreateApplicationData } from 'data/application';
import { getMessageFromError } from 'utils/error';
import { APIRoute } from 'utils/routes';
import { displayErrorToast } from 'utils/toast';

const createApplicationOnServer = async (
  applicationData: CreateApplicationData,
): Promise<Application> => {
  const { data: application } = await axios.post<Application>(
    `${APIRoute.APPLICATIONS}`,
    applicationData,
  );
  return application;
};

const useCreateApplication = ({
  onSuccess,
}: {
  onSuccess: UseMutationOptions<Application, unknown, CreateApplicationData>['onSuccess'];
}) => {
  const { mutate: createEvent } = useMutation(createApplicationOnServer, {
    onError: error => displayErrorToast({ title: getMessageFromError(error) }),
    onSuccess: (data, variables, context) => {
      if (onSuccess) onSuccess(data, variables, context);
    },
  });

  return createEvent;
};

export default useCreateApplication;
