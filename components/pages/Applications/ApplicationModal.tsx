import { BiEdit } from 'react-icons/bi';
import { useDisclosure } from '@chakra-ui/react';
import Secured from 'components/core/Authentication/Secured';
import Box from 'components/core/Containers/Box';
import Button from 'components/core/Interactive/Button';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from 'components/core/Overlay/Modal';
import Text from 'components/core/Typography/Text';
import {
  Application,
  ApplicationFormAnswer,
  CreateApplicationData,
  WithDiscordInfos,
} from 'data/application';
import useDeleteApplication from 'hooks/applications/useDeleteApplication';
import useEditApplication from 'hooks/applications/useEditApplication';
import { applicationPrivilege, PermissionCategory } from 'utils/permissions';
import { Callback, Entries } from 'utils/types';
import ApplicationAnswers from './ApplicationAnswers';
import ApplicationComments from './ApplicationComments';
import ApplicationDate from './ApplicationDate';
import ApplicationForm from './ApplicationForm';
import ApplicationIdentity from './ApplicationIdentity';
import ApplicationModalStatus from './ApplicationModalStatus';

const hasSameValues = (formAnswer1: ApplicationFormAnswer, formAnswer2: ApplicationFormAnswer) =>
  (Object.entries(formAnswer1) as Entries<ApplicationFormAnswer>).every(
    ([key, value]) => formAnswer2[key] === value,
  );

interface ApplicationModalProps {
  application: WithDiscordInfos<Application>;
  isOpen: boolean;
  onClose: Callback;
}

const ApplicationModal: React.FC<ApplicationModalProps> = ({ application, isOpen, onClose }) => {
  const editionModal = useDisclosure();
  const editApplication = useEditApplication(application, { onSuccess: editionModal.onClose });
  const deleteApplication = useDeleteApplication(application);

  const onEditionSubmit = (createApplicationData: CreateApplicationData) => {
    if (
      ('discordName' in createApplicationData &&
        createApplicationData.discordName !== application.discordName) ||
      ('userId' in createApplicationData && createApplicationData.userId !== application.userId) ||
      (!('userId' in createApplicationData) && application.userId) ||
      !hasSameValues(createApplicationData.applicationFormAnswer, application.applicationFormAnswer)
    )
      editApplication(createApplicationData);
    else editionModal.onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent data-cy="application">
        <ModalCloseButton />
        <ModalHeader display="flex" justifyContent="center">
          <Box maxWidth="full">
            <ApplicationIdentity application={application} />
          </Box>
        </ModalHeader>
        <ModalBody>
          <Text textAlign="end" fontStyle="italic">
            Candidature créée le <ApplicationDate date={application.createdAt} />
          </Text>
          <ApplicationAnswers application={application} />
          <Secured permissions={{ [PermissionCategory.APPLICATION]: applicationPrivilege.MANAGE }}>
            <Button
              data-cy="edit"
              marginTop={5}
              leftIcon={<BiEdit />}
              onClick={editionModal.onOpen}
            >
              Modifier
            </Button>
            <ApplicationForm
              display="modal"
              isOpen={editionModal.isOpen}
              onClose={editionModal.onClose}
              application={application}
              onSubmit={onEditionSubmit}
              onDelete={deleteApplication}
            />
          </Secured>
          <ApplicationModalStatus application={application} />
          <Secured permissions={{ [PermissionCategory.APPLICATION]: applicationPrivilege.MANAGE }}>
            <ApplicationComments application={application} />
          </Secured>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ApplicationModal;
