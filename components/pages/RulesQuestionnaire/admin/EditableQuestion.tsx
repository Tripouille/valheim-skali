import { useState } from 'react';
import { useBoolean } from '@chakra-ui/react';
import Box from 'components/core/Containers/Box';
import Flex from 'components/core/Containers/Flex';
import { Stack } from 'components/core/Containers/Stack';
import FromMarkup from 'components/core/DataDisplay/FromMarkup';
import Text from 'components/core/Typography/Text';
import {
  CreateQuestionData,
  getCreateQuestionDataForServer,
  isQuestionValid,
  Question,
  QUESTION_TYPE_TO_LABEL,
} from 'data/rulesQuestionnaire';
import useDeleteQuestion from 'hooks/rules-questionnaire/useDeleteQuestion';
import useEditQuestion from 'hooks/rules-questionnaire/useEditQuestion';
import EditableQuestionControls from './EditableQuestionControls';
import MCQQuestion from './MCQQuestion';
import QuestionForm from './QuestionForm';

interface EditableQuestionProps {
  question: Question;
  onChange?: (question: Question) => void;
}

const EditableQuestion: React.FC<EditableQuestionProps> = ({ question }) => {
  const [isEditing, setIsEditing] = useBoolean(false);
  const [questionFormData, setQuestionFormData] = useState<Partial<CreateQuestionData>>(question);

  const editQuestion = useEditQuestion(question._id, { onSuccess: setIsEditing.off });
  const deleteQuestion = useDeleteQuestion(question._id);

  const onCancel = () => {
    setIsEditing.off();
    setQuestionFormData(question);
  };

  const isQuestionEdited = () => JSON.stringify(question) !== JSON.stringify(questionFormData);

  let QuestionComponent;
  switch (question.type) {
    case 'simple':
    case 'long':
      QuestionComponent = <FromMarkup content={question.label} />;
      break;
    case 'single-choice':
    case 'multiple-choice':
      QuestionComponent = <MCQQuestion question={question} />;
      break;
  }

  return (
    <Flex gap={2}>
      <Box flex="1">
        {isEditing ? (
          <Stack as="form" spacing={5} onSubmit={() => {}}>
            <QuestionForm
              questionFormData={questionFormData}
              setQuestionFormData={setQuestionFormData}
            />
          </Stack>
        ) : (
          <>
            <Text fontStyle="italic">{QUESTION_TYPE_TO_LABEL[question.type]}</Text>
            {QuestionComponent}
          </>
        )}
      </Box>
      <EditableQuestionControls
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        canSubmit={isEditing && isQuestionValid(questionFormData) && isQuestionEdited()}
        onSubmit={() => editQuestion(getCreateQuestionDataForServer(questionFormData))}
        onCancel={onCancel}
        onDelete={deleteQuestion}
      />
    </Flex>
  );
};

export default EditableQuestion;
