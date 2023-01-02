import { useEffect, useRef } from 'react';
import { BiEdit, BiLinkExternal } from 'react-icons/bi';
import { useDisclosure } from '@chakra-ui/react';
import Secured from 'components/core/Authentication/Secured';
import Box from 'components/core/Containers/Box';
import { Stack } from 'components/core/Containers/Stack';
import Icon from 'components/core/Images/Icon';
import Button from 'components/core/Interactive/Button';
import Link from 'components/core/Interactive/Link';
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
import ApplicationModalQuestionnaire from './ApplicationModalQuestionnaire';
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

  const questionnaireDisplay = useDisclosure({ defaultIsOpen: false });

  const modalBodyRef = useRef<HTMLDivElement>(null);
  useEffect(
    function scrollTopOnQuestionnaireToggle() {
      setTimeout(() => {
        if (modalBodyRef.current) modalBodyRef.current.scrollTo(0, 0);
      });
    },
    [questionnaireDisplay.isOpen],
  );

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
        <ModalBody ref={modalBodyRef}>
          {application.questionnaire && questionnaireDisplay.isOpen ? (
            <ApplicationModalQuestionnaire
              questionnaire={application.questionnaire}
              onBack={questionnaireDisplay.onClose}
            />
          ) : (
            <>
              <Text textAlign="end" fontStyle="italic">
                Candidature créée le <ApplicationDate date={application.createdAt} />
              </Text>
              <Stack align="start" width="full" spacing={4}>
                <ApplicationModalStatus application={application} />
                <Box>
                  <ApplicationAnswers application={application} />
                  <Secured
                    permissions={{ [PermissionCategory.APPLICATION]: applicationPrivilege.MANAGE }}
                  >
                    <Button
                      data-cy="edit"
                      marginTop={3}
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
                </Box>
                {application.questionnaire && (
                  <Secured
                    permissions={{ [PermissionCategory.APPLICATION]: applicationPrivilege.MANAGE }}
                  >
                    <Link data-cy="questionnaire" onClick={questionnaireDisplay.onOpen}>
                      Voir le questionnaire
                      <Icon as={BiLinkExternal} verticalAlign="text-bottom" marginStart={2} />
                    </Link>
                  </Secured>
                )}
                <Secured
                  permissions={{ [PermissionCategory.APPLICATION]: applicationPrivilege.MANAGE }}
                >
                  <ApplicationComments application={application} />
                </Secured>
              </Stack>
            </>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ApplicationModal;
