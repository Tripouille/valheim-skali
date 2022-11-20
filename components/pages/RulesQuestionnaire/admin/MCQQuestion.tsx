import { BiCheckbox, BiRadioCircle } from 'react-icons/bi';
import Box from 'components/core/Containers/Box';
import IconList from 'components/core/DataDisplay/IconList';
import Text from 'components/core/Typography/Text';
import { MCQQuestion } from 'data/rulesQuestionnaire';

interface EditableMCQQuestionProps {
  question: MCQQuestion;
}

const EditableMCQQuestion: React.FC<EditableMCQQuestionProps> = ({ question }) => (
  <Box flex={1}>
    <Text marginBottom={2}>{question.label}</Text>
    <IconList
      icon={question.type === 'single-choice' ? BiRadioCircle : BiCheckbox}
      marginStart={3}
      list={question.options}
    />
  </Box>
);

export default EditableMCQQuestion;
