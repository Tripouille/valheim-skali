import { BsPlusLg } from 'react-icons/bs';
import { useDisclosure } from '@chakra-ui/react';
import Secured from 'components/core/Authentication/Secured';
import Background from 'components/core/Containers/Background';
import { VStack } from 'components/core/Containers/Stack';
import { Accordion } from 'components/core/Disclosure/Accordion';
import QueryHandler from 'components/core/Disclosure/QueryHandler';
import Button from 'components/core/Interactive/Button';
import PageTitle from 'components/core/Typography/PageTitle';
import useApplications from 'hooks/applications/useApplications';
import useCreateApplication from 'hooks/applications/useCreateApplication';
import { applicationPrivilege, PermissionCategory } from 'utils/permissions';
import ApplicationItem from './ApplicationAccordionItem';
import ApplicationForm from './ApplicationForm';

const Applications = () => {
  const applicationsQuery = useApplications();

  const createModal = useDisclosure();
  const createApplication = useCreateApplication({ onSuccess: createModal.onClose });

  return (
    <Secured
      permissions={{ [PermissionCategory.APPLICATION]: applicationPrivilege.READ }}
      redirectOnFail
    >
      <Background data-cy="applications" position="relative">
        <VStack spacing="7" position="relative">
          <PageTitle title="Candidatures" />
          <Secured permissions={{ [PermissionCategory.APPLICATION]: applicationPrivilege.MANAGE }}>
            <Button
              data-cy="create-application"
              position={{ md: 'absolute' }}
              alignSelf={{ base: 'center', md: 'end' }}
              mt="1rem !important"
              leftIcon={<BsPlusLg />}
              colorScheme="green"
              size="sm"
              onClick={createModal.onOpen}
            >
              Ajouter une candidature
            </Button>
            <ApplicationForm
              display="modal"
              isOpen={createModal.isOpen}
              onClose={createModal.onClose}
              onSubmit={createApplication}
            />
          </Secured>
          <QueryHandler query={applicationsQuery}>
            <Accordion width="full" defaultIndex={[0]} allowMultiple>
              {applicationsQuery.data?.map(application => (
                <ApplicationItem key={application._id} application={application} />
              ))}
            </Accordion>
          </QueryHandler>
        </VStack>
      </Background>
    </Secured>
  );
};

export default Applications;
