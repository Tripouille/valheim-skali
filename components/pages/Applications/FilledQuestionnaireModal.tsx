import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from 'components/core/Overlay/Modal';
import { GeneratedQuestionAndAnswer } from 'data/application';
import { Callback } from 'utils/types';
import FilledQuestionnaire from './FilledQuestionnaire';

interface FilledQuestionnaireModalProps {
  questionsWithAnswers: GeneratedQuestionAndAnswer[];
  modal: {
    isOpen: boolean;
    onClose: Callback;
  };
}

const FilledQuestionnaireModal: React.FC<FilledQuestionnaireModalProps> = ({
  questionsWithAnswers,
  modal,
}) => {
  return (
    <Modal isOpen={modal.isOpen} onClose={modal.onClose}>
      <ModalOverlay />
      <ModalContent data-cy="filled-questionnaire" border="2px white solid">
        <ModalCloseButton />
        <ModalHeader textAlign="center">Mon questionnaire</ModalHeader>
        <ModalBody>
          <FilledQuestionnaire questionsWithAnswers={questionsWithAnswers} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default FilledQuestionnaireModal;
