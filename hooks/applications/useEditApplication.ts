import axios from 'axios';
import { CreateApplicationData, Application } from 'data/application';
import useOptimisticMutation from 'hooks/useOptimisticMutation';
import { queryClient, QueryKeys } from 'utils/queryClient';
import { APIRoute } from 'utils/routes';
import { Callback } from 'utils/types';

const editApplicationOnServer =
  (editedApplication: Application) => async (createApplicationData: CreateApplicationData) => {
    await axios.put(`${APIRoute.APPLICATIONS}/${editedApplication._id}`, createApplicationData);
  };

const useEditApplication = (
  editedApplication: Application,
  { onSuccess }: { onSuccess: Callback },
) => {
  const editApplication = useOptimisticMutation<QueryKeys.APPLICATIONS, CreateApplicationData>(
    QueryKeys.APPLICATIONS,
    editApplicationOnServer(editedApplication),
    (previousApplications, createApplicationData) =>
      previousApplications?.map(application =>
        application._id === editedApplication._id
          ? { ...application, ...createApplicationData }
          : application,
      ) ?? [],
    'La candidature a bien été mise à jour.',
    {
      onSuccess,
      onSettled: () => queryClient.invalidateQueries([QueryKeys.APPLICATION_ASSOCIABLE_USERS]),
    },
  );

  return editApplication;
};

export default useEditApplication;
