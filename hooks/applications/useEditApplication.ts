import axios from 'axios';
import { CreateApplicationData, Application } from 'data/application';
import useOptimisticMutation from 'hooks/useOptimisticMutation';
import { APIRoute } from 'utils/routes';
import { QueryKeys } from 'utils/queryClient';
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
          ? {
              ...application,
              discordName: createApplicationData.discordName,
              applicationFormAnswer: createApplicationData.applicationFormAnswer,
            }
          : application,
      ) ?? [],
    'La candidature a bien été mise à jour.',
    { onSuccess },
  );

  return editApplication;
};

export default useEditApplication;
