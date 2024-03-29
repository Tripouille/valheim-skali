import { useEffect, useRef, useState } from 'react';
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
  QuestionPositionType,
  QUESTION_TYPE_TO_LABEL,
} from 'data/rulesQuestionnaire';
import useDeleteQuestion from 'hooks/rules-questionnaire/useDeleteQuestion';
import useEditQuestion from 'hooks/rules-questionnaire/useEditQuestion';
import useMoveQuestion from 'hooks/rules-questionnaire/useMoveQuestion';
import { scrollIntoViewIfNeeded } from 'utils/window';
import EditableQuestionControls from './EditableQuestionControls';
import MCQQuestion from './MCQQuestion';
import QuestionForm from './QuestionForm';

interface EditableQuestionProps {
  question: Question;
  questionIndex: number;
  questionsLength: number;
}

const EditableQuestion: React.FC<EditableQuestionProps> = ({
  question,
  questionIndex,
  questionsLength,
}) => {
  const [isEditing, setIsEditing] = useBoolean(false);
  const [questionFormData, setQuestionFormData] = useState<Partial<CreateQuestionData>>(question);

  const editQuestion = useEditQuestion(question._id, { onSuccess: setIsEditing.off });
  const deleteQuestion = useDeleteQuestion(question._id);
  const moveQuestion = useMoveQuestion(question);

  const formRef = useRef(null);
  useEffect(
    function scrollFormIntoView() {
      const form = formRef.current;
      if (isEditing && form) setTimeout(() => scrollIntoViewIfNeeded(form, undefined, 'smooth'));
    },
    [isEditing, questionFormData.type],
  );

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
    <Flex data-cy="question" gap={2}>
      <Box flex="1">
        {isEditing ? (
          <Stack ref={formRef} as="form" spacing={5}>
            <QuestionForm
              questionFormData={questionFormData}
              setQuestionFormData={setQuestionFormData}
            />
          </Stack>
        ) : (
          <>
            <Text fontStyle="italic">
              {QUESTION_TYPE_TO_LABEL[question.type]}
              {question.positionType === QuestionPositionType.BEGINNING && ' (Au début)'}
              {question.positionType === QuestionPositionType.END && ' (A la fin)'}
              {question.alwaysIncluded && ' (Toujours incluse)'}
            </Text>
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
        canMoveUp={question.positionType !== QuestionPositionType.RANDOM && questionIndex > 0}
        canMoveDown={
          question.positionType !== QuestionPositionType.RANDOM &&
          questionIndex < questionsLength - 1
        }
        onMoveUp={() => moveQuestion(questionIndex - 1)}
        onMoveDown={() => moveQuestion(questionIndex + 1)}
      />
    </Flex>
  );
};

export default EditableQuestion;
