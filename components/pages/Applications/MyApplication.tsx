import NextLink from 'next/link';
import { BiEdit } from 'react-icons/bi';
import Background from 'components/core/Containers/Background';
import Flex from 'components/core/Containers/Flex';
import { Stack } from 'components/core/Containers/Stack';
import Tag from 'components/core/DataDisplay/Tag';
import QueryHandler from 'components/core/Disclosure/QueryHandler';
import Button from 'components/core/Interactive/Button';
import PageTitle from 'components/core/Typography/PageTitle';
import ApplicationAnswerLine from 'components/pages/Applications/ApplicationAnswerLine';
import ApplicationIdentity from 'components/pages/Applications/ApplicationIdentity';
import { Application, APPLICATION_STATUS_TO_LABEL } from 'data/application';
import useMyApplication from 'hooks/applications/useMyApplication';
import { getRoute } from 'utils/routes';
import { Entries } from 'utils/types';

const MyApplication = () => {
  const myApplicationQuery = useMyApplication();
  const application = myApplicationQuery.data;
  const applicationFormEntries = Object.entries(
    application?.applicationFormAnswer ?? {},
  ) as Entries<Application['applicationFormAnswer']>;

  return (
    <Background>
      <Stack spacing="8">
        <PageTitle title="Ma candidature" />
        <QueryHandler query={myApplicationQuery}>
          {application && (
            <Flex maxW="full" justify="space-between" align="center">
              <ApplicationIdentity application={application} />
              <Tag label={APPLICATION_STATUS_TO_LABEL[application.status]} />
            </Flex>
          )}
          <Stack>
            {applicationFormEntries.map(([questionKey, answer]) => (
              <ApplicationAnswerLine key={questionKey} questionKey={questionKey} answer={answer} />
            ))}
          </Stack>
          <NextLink href={getRoute('applications/me/edit')} passHref>
            <Button as="a" alignSelf="start" data-cy="edit" leftIcon={<BiEdit />}>
              Modifier
            </Button>
          </NextLink>
        </QueryHandler>
      </Stack>
    </Background>
  );
};

export default MyApplication;
