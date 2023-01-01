import { useState } from 'react';
import { BsPlusLg, BsXLg } from 'react-icons/bs';
import { StackDivider, useBoolean, useDisclosure } from '@chakra-ui/react';
import Flex from 'components/core/Containers/Flex';
import { Stack } from 'components/core/Containers/Stack';
import QueryHandler from 'components/core/Disclosure/QueryHandler';
import Button from 'components/core/Interactive/Button';
import IconButton from 'components/core/Interactive/IconButton';
import Text from 'components/core/Typography/Text';
import { GeneratedRulesQuestionnaire } from 'data/application';
import { DEFAULT_QUESTIONS_NUMBER, QuestionPositionType } from 'data/rulesQuestionnaire';
import useQuestions from 'hooks/rules-questionnaire/useQuestions';
import generateRulesQuestionnaire from 'utils/generateRulesQuestionnaire';
import QuestionnaireModal from '../QuestionnaireModal';
import EditablePreamble from './EditablePreamble';
import EditableQuestion from './EditableQuestion';
import EditableQuestionsNumber from './EditableQuestionsNumber';
import NewQuestionForm from './NewQuestionForm';

const RulesQuestionnaireAdmin = () => {
  const questionsQuery = useQuestions();
  const preamble = questionsQuery.data?.preamble ?? '';
  const questionsNumber = questionsQuery.data?.questionsNumber ?? DEFAULT_QUESTIONS_NUMBER;

  const [isAddingQuestion, setIsAddingQuestion] = useBoolean(false);

  const [previewQuestionnaire, setPreviewQuestionnaire] = useState<GeneratedRulesQuestionnaire>();
  const previewModal = useDisclosure();
  const preview = () => {
    if (!questionsQuery.data) return;
    const generatedRulesQuestionnaire = generateRulesQuestionnaire(questionsQuery.data);
    setPreviewQuestionnaire(generatedRulesQuestionnaire);
    previewModal.onOpen();
  };

  return (
    <QueryHandler query={questionsQuery}>
      <Stack textAlign="start" spacing={3} divider={<StackDivider />}>
        <Stack align="center" spacing={4}>
          <EditableQuestionsNumber initialValue={questionsNumber} />
          <Text marginTop={4} fontStyle="italic" textAlign="start">
            {`${
              questionsNumber ?? 'Des'
            } questions seront choisies au hasard parmi celles ci-dessous. Le préambule ne fait pas partie des questions. Toutes les questions seront générées dans un ordre aléatoire, sauf celles "Au début" et "A la fin". Seules les questions marquées "Toujours incluse" (même celles de début et de fin) seront garanties d\'être dans le questionnaire.`}
          </Text>
          <Button onClick={preview}>
            Voir un exemple de questionnaire avec cette configuration
          </Button>
          {previewQuestionnaire && (
            <QuestionnaireModal
              title="Exemple de questionnaire"
              questionnaire={previewQuestionnaire}
              modal={previewModal}
              withPreamble
            />
          )}
        </Stack>
        <EditablePreamble initialValue={preamble} />
        {Object.values(QuestionPositionType).map(position =>
          questionsQuery.data?.[position]?.map((question, index) => (
            <EditableQuestion
              key={question._id}
              question={question}
              questionIndex={index}
              questionsLength={questionsQuery.data[position].length}
            />
          )),
        )}
        {isAddingQuestion && (
          <Flex gap={2}>
            <NewQuestionForm onQuestionCreated={setIsAddingQuestion.off} />
            <IconButton
              title="Annuler"
              aria-label="Annuler"
              icon={<BsXLg />}
              size="sm"
              bgColor="#708099"
              _hover={{ bgColor: '#607089' }}
              onClick={setIsAddingQuestion.off}
            />
          </Flex>
        )}
      </Stack>
      {!isAddingQuestion && (
        <Button
          data-cy="add-question"
          leftIcon={<BsPlusLg />}
          colorScheme="green"
          alignSelf="center"
          marginTop={10}
          onClick={setIsAddingQuestion.on}
        >
          Ajouter une question
        </Button>
      )}
    </QueryHandler>
  );
};

export default RulesQuestionnaireAdmin;
