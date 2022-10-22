import { chakra, useBoolean } from '@chakra-ui/react';
import { ApplicationFormAnswer, APPLICATION_FORM_KEY_TO_LABEL } from 'data/application';

interface ApplicationAnswerLineProps {
  questionKey: keyof ApplicationFormAnswer;
  answer: string;
  alwaysShowFullAnswer?: boolean;
}

const ApplicationAnswerLine: React.FC<ApplicationAnswerLineProps> = ({
  questionKey,
  answer,
  alwaysShowFullAnswer,
}) => {
  const [isExpanded, setExpanded] = useBoolean(false);
  const blockAnswer = answer.length > 800;
  const hideLongAnswer = answer.length > 1000 && !alwaysShowFullAnswer && !isExpanded;

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

export default ApplicationAnswerLine;
