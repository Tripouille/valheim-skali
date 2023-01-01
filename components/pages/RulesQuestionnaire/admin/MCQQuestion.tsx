import { BiCheckbox, BiRadioCircle } from 'react-icons/bi';
import Box from 'components/core/Containers/Box';
import FromMarkup from 'components/core/DataDisplay/FromMarkup';
import IconList from 'components/core/DataDisplay/IconList';
import { MCQQuestion } from 'data/rulesQuestionnaire';

interface EditableMCQQuestionProps {
  question: MCQQuestion;
}

const EditableMCQQuestion: React.FC<EditableMCQQuestionProps> = ({ question }) => (
  <Box flex={1}>
    <FromMarkup content={question.label} marginBottom={2} />
    <IconList
      icon={question.type === 'single-choice' ? BiRadioCircle : BiCheckbox}
      marginStart={3}
      list={question.options}
    />
  </Box>
);

export default EditableMCQQuestion;
