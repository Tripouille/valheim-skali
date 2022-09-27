import { useDisclosure } from '@chakra-ui/react';
import { BiEdit } from 'react-icons/bi';
import Secured from 'components/core/Authentication/Secured';
import Box from 'components/core/Containers/Box';
import Center from 'components/core/Containers/Center';
import IconButton from 'components/core/Interactive/IconButton';
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
import { applicationPrivilege, PermissionCategory } from 'utils/permissions';
import { Callback, Entries } from 'utils/types';
import ApplicationAnswerLine from './ApplicationAnswerLine';
import ApplicationComments from './ApplicationComments';
import ApplicationDate from './ApplicationDate';
import ApplicationIdentity from './ApplicationIdentity';
import ApplicationForm from './ApplicationForm';
import ApplicationModalStatus from './ApplicationModalStatus';
import useDeleteApplication from 'hooks/applications/useDeleteApplication';
import useEditApplication from 'hooks/applications/useEditApplication';

const hasSameValues = (formAnswer1: ApplicationFormAnswer, formAnswer2: ApplicationFormAnswer) =>
  Object.entries(formAnswer1).every(
    ([key, value]) => formAnswer2[key as keyof ApplicationFormAnswer] === value,
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

  const applicationFormEntries = Object.entries(application.applicationFormAnswer) as Entries<
    typeof application['applicationFormAnswer']
  >;

  const onEditionSubmit = (createApplicationData: CreateApplicationData) => {
    if (
      createApplicationData.discordName !== application.discordName ||
      !hasSameValues(createApplicationData.applicationFormAnswer, application.applicationFormAnswer)
    )
      editApplication(createApplicationData);
    else editionModal.onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent data-cy="application-modal">
        <ModalCloseButton />
        <ModalHeader>
          <Center>
            <ApplicationIdentity application={application} />
          </Center>
        </ModalHeader>
        <ModalBody>
          <Text textAlign="end" fontStyle="italic">
            Candidature créée le <ApplicationDate date={application.createdAt} />
          </Text>
          <Box>
            {applicationFormEntries.map(([questionKey, answer]) => (
              <ApplicationAnswerLine key={questionKey} questionKey={questionKey} answer={answer} />
            ))}
          </Box>
          <Secured permissions={{ [PermissionCategory.APPLICATION]: applicationPrivilege.MANAGE }}>
            <IconButton
              aria-label="Modifier la candidature"
              title="Modifier la candidature"
              icon={<BiEdit />}
              onClick={editionModal.onOpen}
            />
            <ApplicationForm
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