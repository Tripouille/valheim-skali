import { chakra, useBoolean } from '@chakra-ui/react';
import { ApplicationFormAnswer, APPLICATION_FORM_KEY_TO_LABEL } from 'data/application';

interface ApplicationAnswerLineProps {
  questionKey: keyof ApplicationFormAnswer;
  answer: string;
}

const ApplicationAnswerLine: React.FC<ApplicationAnswerLineProps> = ({ questionKey, answer }) => {
  const [isExpanded, setExpanded] = useBoolean(false);

  return (
    <chakra.dl onClick={setExpanded.toggle}>
      <chakra.dt color="blue.200" display="inline-block" marginRight="2" marginBottom="1">
        {APPLICATION_FORM_KEY_TO_LABEL[questionKey]}
      </chakra.dt>
      {answer.length > 800 ? (
        <chakra.dd
          noOfLines={isExpanded ? undefined : 5}
          cursor="pointer"
          _hover={{ background: 'rgba(0, 0, 0, 0.08)' }}
          borderRadius="sm"
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
