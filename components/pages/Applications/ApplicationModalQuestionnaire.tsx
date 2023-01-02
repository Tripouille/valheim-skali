import { BsArrowLeft } from 'react-icons/bs';
import { Stack } from 'components/core/Containers/Stack';
import Button from 'components/core/Interactive/Button';
import { GeneratedRulesQuestionnaire } from 'data/application';
import { Callback } from 'utils/types';
import FilledQuestionnaire from './FilledQuestionnaire';

interface ApplicationModalQuestionnaireProps {
  questionnaire: GeneratedRulesQuestionnaire;
  onBack: Callback;
}

const ApplicationModalQuestionnaire: React.FC<ApplicationModalQuestionnaireProps> = ({
  questionnaire,
  onBack,
}) => {
  return (
    <Stack spacing={4} align="start">
      <Button data-cy="back" leftIcon={<BsArrowLeft />} onClick={onBack}>
        Retour
      </Button>
      <FilledQuestionnaire questionsWithAnswers={questionnaire.questionsWithAnswers} />
      <Button data-cy="back" leftIcon={<BsArrowLeft />} onClick={onBack}>
        Retour
      </Button>
    </Stack>
  );
};

export default ApplicationModalQuestionnaire;
