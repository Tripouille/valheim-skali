import { chakra, useBoolean } from '@chakra-ui/react';
import { Stack } from 'components/core/Containers/Stack';
import {
  Application,
  ApplicationFormAnswer,
  APPLICATION_FORM_KEY_TO_LABEL,
} from 'data/application';
import useSession from 'hooks/useSession';
import { applicationPrivilege, PermissionCategory } from 'utils/permissions';
import { Entries } from 'utils/types';

interface ApplicationAnswerLineProps {
  questionKey: keyof ApplicationFormAnswer;
  answer: string;
  showFullAnswer?: boolean;
}

const ApplicationAnswerLine: React.FC<ApplicationAnswerLineProps> = ({
  questionKey,
  answer,
  showFullAnswer,
}) => {
  const [isExpanded, setExpanded] = useBoolean(false);
  const blockAnswer = answer.length > 800;
  const hideLongAnswer = answer.length > 1000 && !showFullAnswer && !isExpanded;

  return (
    <chakra.dl onClick={setExpanded.toggle}>
      <chakra.dt color="blue.200" display="inline-block" marginRight="2" marginBottom="1">
        {APPLICATION_FORM_KEY_TO_LABEL[questionKey]}
      </chakra.dt>
      {blockAnswer ? (
        <chakra.dd
          whiteSpace="pre-wrap"
          {...(hideLongAnswer && {
            noOfLines: 6,
            cursor: 'pointer',
            _hover: { background: 'rgba(0, 0, 0, 0.08)' },
            borderRadius: 'sm',
          })}
        >
          {answer}
        </chakra.dd>
      ) : (
        <chakra.dd display="inline">{answer}</chakra.dd>
      )}
    </chakra.dl>
  );
};

interface ApplicationAnswersProps {
  application: Application;
  showFullAnswers?: true;
}

const ApplicationAnswers: React.FC<ApplicationAnswersProps> = ({
  application,
  showFullAnswers,
}) => {
  const { data: session, hasRequiredPermissions } = useSession();
  const isOwnApplication = 'userId' in application && session?.user._id === application.userId;

  const applicationFormEntries = Object.entries(
    application.applicationFormAnswer,
  ) as Entries<ApplicationFormAnswer>;

  return (
    <Stack>
      {applicationFormEntries.map(([questionKey, answer]) => {
        if (questionKey === 'steamName' || questionKey === 'steamID') {
          if (
            !isOwnApplication &&
            !hasRequiredPermissions({
              [PermissionCategory.APPLICATION]: applicationPrivilege.MANAGE,
            })
          )
            return null;
        }
        return (
          <ApplicationAnswerLine
            key={questionKey}
            questionKey={questionKey}
            answer={answer}
            showFullAnswer={showFullAnswers}
          />
        );
      })}
    </Stack>
  );
};

export default ApplicationAnswers;
