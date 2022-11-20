import { useRadio, UseRadioProps } from '@chakra-ui/react';
import Box from 'components/core/Containers/Box';
import Tooltip from 'components/core/Overlay/Tooltip';
import { QuestionType, QUESTION_TYPE_TO_EXPLANATION } from 'data/rulesQuestionnaire';

const QuestionTypeRadioButton: React.FC<UseRadioProps> = props => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  return (
    <Tooltip
      label={QUESTION_TYPE_TO_EXPLANATION[props.value as QuestionType]}
      placement="top-start"
      hasArrow
    >
      <Box as="label">
        <input {...getInputProps()} />
        <Box
          {...getCheckboxProps()}
          cursor="pointer"
          borderWidth="1px"
          borderRadius="md"
          boxShadow="md"
          _hover={{ bg: 'blue.600' }}
          _checked={{ bg: 'blue.500' }}
          px={4}
          py={2}
        >
          {props.children}
        </Box>
      </Box>
    </Tooltip>
  );
};

export default QuestionTypeRadioButton;
