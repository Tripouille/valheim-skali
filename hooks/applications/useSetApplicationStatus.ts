import axios from 'axios';
import useOptimisticMutation from 'hooks/useOptimisticMutation';
import { APIRoute } from 'utils/routes';
import { queryClient, QueryKeys } from 'utils/queryClient';
import { Application, ApplicationStatus, WithDiscordInfos } from 'data/application';

const setApplicationStatusOnServer =
  (application: Application) => async (status: ApplicationStatus) => {
    await axios.patch(`${APIRoute.APPLICATIONS}/${application._id}`, { status });
  };

const getUpdatedApplications = (
  previousApplications: WithDiscordInfos<Application>[],
  updatedApplication: Application,
  newStatus: ApplicationStatus,
) =>
  previousApplications.map(application =>
    application._id === updatedApplication._id
      ? { ...application, status: newStatus }
      : application,
  );

const useSetApplicationStatus = (application: Application) => {
  const mutate = useOptimisticMutation<QueryKeys.APPLICATIONS, ApplicationStatus>(
    QueryKeys.APPLICATIONS,
    setApplicationStatusOnServer(application),
    (previousApplications, newStatus) => {
      return getUpdatedApplications(previousApplications, application, newStatus);
    },
    'La candidature a bien été mise à jour avec un nouveau statut.',
    { onSettled: () => queryClient.invalidateQueries([QueryKeys.USERS]) },
  );

  return mutate;
};

export default useSetApplicationStatus;
