import Background from 'components/core/Containers/Background';
import PageTitle from 'components/core/Typography/PageTitle';
import ApplicationForm from 'components/pages/Applications/ApplicationForm';
import useCreateApplication from 'hooks/applications/useCreateApplication';

const NewApplicationPage = () => {
  const createApplication = useCreateApplication({});

  return (
    <Background>
      <PageTitle title="Ma candidature" mb="8" />
      <ApplicationForm display="fullPage" onSubmit={createApplication} />
    </Background>
  );
};

export default NewApplicationPage;
