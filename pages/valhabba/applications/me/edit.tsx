import { useRouter } from 'next/router';
import Background from 'components/core/Containers/Background';
import QueryHandler from 'components/core/Disclosure/QueryHandler';
import PageTitle from 'components/core/Typography/PageTitle';
import ApplicationForm from 'components/pages/Applications/ApplicationForm';
import useDeleteMyApplication from 'hooks/applications/useDeleteMyApplication';
import useEditMyApplication from 'hooks/applications/useEditMyApplication';
import useMyApplication from 'hooks/applications/useMyApplication';
import { getRoute } from 'utils/routes';

const EditMyApplicationPage = () => {
  const router = useRouter();

  const myApplicationQuery = useMyApplication();
  const application = myApplicationQuery.data;
  const editMyApplication = useEditMyApplication(application, {
    onSuccess: () => router.push(getRoute('applications/me')),
  });
  const deleteMyApplication = useDeleteMyApplication(application);

  return (
    <Background>
      <PageTitle title="Modifier ma candidature" mb="8" />
      <QueryHandler query={myApplicationQuery}>
        {application && (
          <ApplicationForm
            display="fullPage"
            application={application}
            onSubmit={editMyApplication}
            onDelete={deleteMyApplication}
          />
        )}
      </QueryHandler>
    </Background>
  );
};

export default EditMyApplicationPage;
