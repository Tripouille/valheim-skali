import { BiCheckbox, BiCheckboxChecked, BiRadioCircle, BiRadioCircleMarked } from 'react-icons/bi';
import Box from 'components/core/Containers/Box';
import Flex from 'components/core/Containers/Flex';
import { Stack } from 'components/core/Containers/Stack';
import FromMarkup from 'components/core/DataDisplay/FromMarkup';
import Icon from 'components/core/Images/Icon';
import { GeneratedQuestionAndAnswer } from 'data/application';

interface FilledQuestionnaireProps {
  questionsWithAnswers: GeneratedQuestionAndAnswer[];
}

const FilledQuestionnaire: React.FC<FilledQuestionnaireProps> = ({ questionsWithAnswers }) => (
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
);

export default FilledQuestionnaire;
