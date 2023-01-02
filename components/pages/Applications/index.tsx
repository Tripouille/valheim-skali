import Secured from 'components/core/Authentication/Secured';
import Background from 'components/core/Containers/Background';
import { VStack } from 'components/core/Containers/Stack';
import { Accordion } from 'components/core/Disclosure/Accordion';
import QueryHandler from 'components/core/Disclosure/QueryHandler';
import PageTitle from 'components/core/Typography/PageTitle';
import { ApplicationStatus } from 'data/application';
import useApplications from 'hooks/applications/useApplications';
import { applicationPrivilege, PermissionCategory } from 'utils/permissions';
import ApplicationAccordionItem from './ApplicationAccordionItem';

const Applications = () => {
  const applicationsQuery = useApplications();
  const applications = applicationsQuery.data?.filter(
    application => application.status !== ApplicationStatus.FILLING_QUESTIONNAIRE,
  );

  return (
    <Secured
      permissions={{ [PermissionCategory.APPLICATION]: applicationPrivilege.READ }}
      redirectOnFail
    >
      <Background data-cy="applications" position="relative">
        <VStack spacing="7" position="relative">
          <PageTitle title="Candidatures" />
          <QueryHandler query={applicationsQuery}>
            <Accordion width="full" defaultIndex={[0]} allowMultiple>
              {applications?.map(application => (
                <ApplicationAccordionItem key={application._id} application={application} />
              ))}
            </Accordion>
          </QueryHandler>
        </VStack>
      </Background>
    </Secured>
  );
};

export default Applications;
