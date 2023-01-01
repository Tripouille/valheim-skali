import { BiCheckbox, BiCheckboxChecked, BiRadioCircle, BiRadioCircleMarked } from 'react-icons/bi';
import Box from 'components/core/Containers/Box';
import Flex from 'components/core/Containers/Flex';
import { Stack } from 'components/core/Containers/Stack';
import FromMarkup from 'components/core/DataDisplay/FromMarkup';
import Icon from 'components/core/Images/Icon';
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
          <Stack spacing={4}>
            {questionsWithAnswers.map(({ answer, ...question }, index) => (
              <Box key={index}>
                <FromMarkup content={question.label} marginBottom={1} color="gray.300" />
                {(question.type === 'simple' || question.type === 'long') && answer}
                {(question.type === 'single-choice' || question.type === 'multiple-choice') &&
                  question.options.map(option => (
                    <Flex key={option} align="center">
                      <Icon
                        as={
                          question.type === 'single-choice'
                            ? answer === option
                              ? BiRadioCircleMarked
                              : BiRadioCircle
                            : answer?.includes(option)
                            ? BiCheckboxChecked
                            : BiCheckbox
                        }
                        color="blue.200"
                        boxSize="1.2em"
                        marginEnd={1}
                      />
                      {option}
                    </Flex>
                  ))}
              </Box>
            ))}
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default FilledQuestionnaireModal;
