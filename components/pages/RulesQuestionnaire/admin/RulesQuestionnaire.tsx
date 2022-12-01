import { BsPlusLg, BsXLg } from 'react-icons/bs';
import { StackDivider, useBoolean } from '@chakra-ui/react';
import Flex from 'components/core/Containers/Flex';
import { Stack } from 'components/core/Containers/Stack';
import QueryHandler from 'components/core/Disclosure/QueryHandler';
import Button from 'components/core/Interactive/Button';
import IconButton from 'components/core/Interactive/IconButton';
import { QuestionPositionType } from 'data/rulesQuestionnaire';
import useQuestions from 'hooks/rules-questionnaire/useQuestions';
import EditablePreamble from './EditablePreamble';
import EditableQuestion from './EditableQuestion';
import NewQuestionForm from './NewQuestionForm';

const RulesQuestionnaireAdmin = () => {
  const questionsQuery = useQuestions();
  const preamble = questionsQuery.data?.preamble ?? '';

  const [isAddingQuestion, setIsAddingQuestion] = useBoolean(false);

  return (
    <QueryHandler query={questionsQuery}>
      <Stack textAlign="start" spacing={3} divider={<StackDivider />}>
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
