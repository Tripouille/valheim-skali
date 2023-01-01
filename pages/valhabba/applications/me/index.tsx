import Background from 'components/core/Containers/Background';
import { Stack } from 'components/core/Containers/Stack';
import QueryHandler from 'components/core/Disclosure/QueryHandler';
import PageTitle from 'components/core/Typography/PageTitle';
import MyApplication from 'components/pages/Applications/MyApplication';
import useMyApplication from 'hooks/applications/useMyApplication';

const MyApplicationPage = () => {
  const myApplicationQuery = useMyApplication();
  const application = myApplicationQuery.data;

  return (
    <Background>
      <Stack spacing="8">
        <PageTitle title="Ma candidature" />
        <QueryHandler query={myApplicationQuery}>
          {application && <MyApplication application={application} />}
        </QueryHandler>
      </Stack>
    </Background>
  );
};

export default MyApplicationPage;
