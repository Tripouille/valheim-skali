import { useRouter } from 'next/router';
import { FormEventHandler, useEffect, useRef, useState } from 'react';
import { Divider, useBoolean } from '@chakra-ui/react';
import Box from 'components/core/Containers/Box';
import { Stack } from 'components/core/Containers/Stack';
import FromMarkup from 'components/core/DataDisplay/FromMarkup';
import FormElement from 'components/core/Form/FormElement';
import Button from 'components/core/Interactive/Button';
import Text from 'components/core/Typography/Text';
import {
  Application,
  GeneratedQuestionAndAnswer,
  getQuestionDefaultAnswer,
  isQuestionnaireValid,
} from 'data/application';
import useSaveMyQuestionnaire from 'hooks/applications/useSaveMyQuestionnaire';
import useValidateMyQuestionnaire from 'hooks/applications/useValidateMyQuestionnaire';
import { getRoute, NavRoute } from 'utils/routes';
import getQuestionFormComponent from './getQuestionFormComponent';

interface ValidateButtonProps {
  formData: GeneratedQuestionAndAnswer[];
  isSaving: boolean;
  isSaved: boolean;
}
const ValidateButton: React.FC<ValidateButtonProps> = ({ formData, isSaving, isSaved }) => {
  const isValid = isQuestionnaireValid(formData);

  return (
    <Box textAlign="center" marginTop={10}>
      <Button
        data-cy="submit"
        type="submit"
        colorScheme="green"
        disabled={!isValid || !isSaved}
        isLoading={isSaving}
        loadingText="Enregistrement..."
      >
        Valider mes réponses
      </Button>
      <Text
        marginTop={1}
        fontSize="xs"
        visibility={isSaving && isValid ? 'hidden' : 'visible'}
        color="gray.300"
      >
        {isValid
          ? 'Tu ne pourras plus modifier tes réponses.'
          : 'Tu dois répondre à toutes les questions.'}
      </Text>
    </Box>
  );
};

interface MyQuestionnaireProps {
  application: Application & { questionnaire: NonNullable<Application['questionnaire']> };
}

const MyQuestionnaire: React.FC<MyQuestionnaireProps> = ({ application }) => {
  const [formData, setFormData] = useState(
    application.questionnaire.questionsWithAnswers.map(
      q =>
        ({
          ...q,
          answer: q.answer ?? getQuestionDefaultAnswer(q),
        } as GeneratedQuestionAndAnswer),
    ),
  );
  const lastSavedFormData = useRef(JSON.stringify(formData));
  const [isSaving, setIsSaving] = useBoolean(false);
  const [isSaved, setIsSaved] = useBoolean(true);

  const saveMyQuestionnaire = useSaveMyQuestionnaire({
    onSuccess: () => {
      setIsSaving.off();
      setIsSaved.on();
    },
  });

  useEffect(
    function debounceSave() {
      if (JSON.stringify(formData) === lastSavedFormData.current) return;
      lastSavedFormData.current = JSON.stringify(formData);
      setIsSaved.off();

      const handler = setTimeout(() => {
        setIsSaving.on();
        saveMyQuestionnaire(formData);
      }, 500);
      return () => clearTimeout(handler);
    },
    [formData, saveMyQuestionnaire, setIsSaved, setIsSaving],
  );

  const router = useRouter();
  const validateMyQuestionnaire = useValidateMyQuestionnaire({
    onSuccess: () => router.push(getRoute(NavRoute.MY_APPLICATION)),
  });

  const validate: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    validateMyQuestionnaire();
  };

  const onChange =
    <T extends GeneratedQuestionAndAnswer>(questionIndex: number) =>
    (answer: T['answer']) =>
      setFormData(prev =>
        prev.map((question, index) =>
          index === questionIndex ? { ...(question as T), answer } : question,
        ),
      );

  return (
    <form onSubmit={validate}>
      {application.questionnaire.preamble && (
        <>
          <FromMarkup content={application.questionnaire.preamble} />
          <Divider marginY={5} />
        </>
      )}
      <Stack spacing={6}>
        {formData.map((question, index) => (
          <FormElement key={index} label={question.label} vertical withMarkup>
            {getQuestionFormComponent(question, onChange(index))}
          </FormElement>
        ))}
      </Stack>
      <ValidateButton formData={formData} isSaved={isSaved} isSaving={isSaving} />
    </form>
  );
};

export default MyQuestionnaire;
