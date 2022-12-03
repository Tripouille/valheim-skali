import { FormEventHandler, useState } from 'react';
import { Stack } from 'components/core/Containers/Stack';
import Button from 'components/core/Interactive/Button';
import {
  CreateQuestionData,
  getCreateQuestionDataForServer,
  isQuestionValid,
  QuestionPositionType,
} from 'data/rulesQuestionnaire';
import useCreateQuestion from 'hooks/rules-questionnaire/useCreateQuestion';
import { Callback } from 'utils/types';
import QuestionForm from './QuestionForm';

interface NewQuestionFormProps {
  onQuestionCreated: Callback;
}

const NewQuestionForm: React.FC<NewQuestionFormProps> = ({ onQuestionCreated }) => {
  const [newQuestion, setNewQuestion] = useState<Partial<CreateQuestionData>>({
    positionType: QuestionPositionType.RANDOM,
    alwaysIncluded: false,
  });

  const createQuestion = useCreateQuestion({
    onSuccess: () => {
      setNewQuestion({});
      onQuestionCreated();
    },
  });

  const onSubmit: FormEventHandler<HTMLDivElement> = e => {
    e.preventDefault();
    if (isQuestionValid(newQuestion)) createQuestion(getCreateQuestionDataForServer(newQuestion));
  };

  return (
    <Stack as="form" flex="1" spacing={5} onSubmit={onSubmit}>
      <QuestionForm questionFormData={newQuestion} setQuestionFormData={setNewQuestion}>
        <Button
          data-cy="create-question"
          type="submit"
          alignSelf="center"
          colorScheme="green"
          disabled={!isQuestionValid(newQuestion)}
        >
          Ajouter
        </Button>
      </QuestionForm>
    </Stack>
  );
};

export default NewQuestionForm;
