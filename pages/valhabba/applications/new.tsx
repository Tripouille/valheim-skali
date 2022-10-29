import { useRouter } from 'next/router';
import Background from 'components/core/Containers/Background';
import PageTitle from 'components/core/Typography/PageTitle';
import ApplicationForm from 'components/pages/Applications/ApplicationForm';
import { Application } from 'data/application';
import useCreateApplication from 'hooks/applications/useCreateApplication';
import { queryClient, QueryKeys } from 'utils/queryClient';
import { getRoute } from 'utils/routes';
import { displaySuccessToast } from 'utils/toast';

const NewApplicationPage = () => {
  const router = useRouter();
  const createApplication = useCreateApplication({
    onSuccess: (application: Application) => {
      displaySuccessToast({ title: 'Votre candidature a bien été enregistrée !' });
      queryClient.setQueryData([QueryKeys.MY_APPLICATION], application);
      queryClient.invalidateQueries([QueryKeys.SESSION]);
      router.push(getRoute('applications/me'));
    },
  });

  return (
    <Background>
      <PageTitle title="Ma candidature" mb="8" />
      <ApplicationForm display="fullPage" onSubmit={createApplication} />
    </Background>
  );
};

export default NewApplicationPage;
