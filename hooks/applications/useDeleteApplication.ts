import axios from 'axios';
import { Application } from 'data/application';
import useOptimisticMutation from 'hooks/useOptimisticMutation';
import { QueryKeys, QueryTypes } from 'utils/queryClient';
import { APIRoute } from 'utils/routes';

const deleteApplicationOnServer = (deletedApplication: Application) => async () => {
  await axios.delete(`${APIRoute.APPLICATIONS}/${deletedApplication._id}`);
};

const getUpdatedApplications =
  (deletedApplication: Application) => (previousApplications: QueryTypes[QueryKeys.APPLICATIONS]) =>
    previousApplications?.filter(application => application._id !== deletedApplication._id) ?? [];

const useDeleteApplication = (deletedApplication: Application) => {
  const deleteApplication = useOptimisticMutation(
    QueryKeys.APPLICATIONS,
    deleteApplicationOnServer(deletedApplication),
    getUpdatedApplications(deletedApplication),
    'La candidature a bien été supprimée.',
  );

  return deleteApplication;
};

export default useDeleteApplication;
