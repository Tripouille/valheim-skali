import { FormEventHandler, useEffect, useRef, useState } from 'react';
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
import { scrollIntoViewIfNeeded } from 'utils/window';
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

  const formRef = useRef(null);
  useEffect(
    function scrollFormIntoView() {
      const form = formRef.current;
      if (form) setTimeout(() => scrollIntoViewIfNeeded(form, undefined, 'smooth'));
    },
    [newQuestion.type],
  );

  return (
    <Stack ref={formRef} as="form" flex="1" spacing={5} onSubmit={onSubmit}>
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
