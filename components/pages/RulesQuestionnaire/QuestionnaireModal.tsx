import FromMarkup from 'components/core/DataDisplay/FromMarkup';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from 'components/core/Overlay/Modal';
import { GeneratedRulesQuestionnaire } from 'data/application';
import { Callback } from 'utils/types';
import FilledQuestionnaire from '../Applications/FilledQuestionnaire';

interface QuestionnaireModalProps {
  title: string;
  questionnaire: GeneratedRulesQuestionnaire;
  modal: {
    isOpen: boolean;
    onClose: Callback;
  };
  withPreamble?: boolean;
}

const QuestionnaireModal: React.FC<QuestionnaireModalProps> = ({
  title,
  questionnaire,
  modal,
  withPreamble,
}) => (
  <Modal isOpen={modal.isOpen} onClose={modal.onClose}>
    <ModalOverlay />
    <ModalContent data-cy="questionnaire" border="2px white solid">
      <ModalCloseButton />
      <ModalHeader textAlign="center">{title}</ModalHeader>
      <ModalBody>
        {withPreamble && <FromMarkup content={questionnaire.preamble} marginBottom={6} />}
        <FilledQuestionnaire questionsWithAnswers={questionnaire.questionsWithAnswers} />
      </ModalBody>
    </ModalContent>
  </Modal>
);

export default QuestionnaireModal;
