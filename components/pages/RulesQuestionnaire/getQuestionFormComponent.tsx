import { Checkbox, CheckboxGroup, Radio, RadioGroup } from '@chakra-ui/react';
import { Stack } from 'components/core/Containers/Stack';
import Input from 'components/core/Form/Input';
import Textarea from 'components/core/Form/Textarea';
import { GeneratedQuestionAndAnswer, getQuestionDefaultAnswer } from 'data/application';
import { assertUnreachable } from 'utils/types';

const getQuestionFormComponent = <T extends GeneratedQuestionAndAnswer>(
  question: GeneratedQuestionAndAnswer,
  onChange: (value: T['answer']) => void,
) => {
  if (question.type === 'simple') {
    return (
      <Input value={question.answer ?? getQuestionDefaultAnswer(question)} onChange={onChange} />
    );
  } else if (question.type === 'long') {
    return (
      <Textarea value={question.answer ?? getQuestionDefaultAnswer(question)} onChange={onChange} />
    );
  } else if (question.type === 'single-choice') {
    return (
      <RadioGroup value={question.answer ?? getQuestionDefaultAnswer(question)} onChange={onChange}>
        <Stack>
          {question.options.map(option => (
            <Radio key={option} value={option}>
              {option}
            </Radio>
          ))}
        </Stack>
      </RadioGroup>
    );
  } else if (question.type === 'multiple-choice') {
    return (
      <CheckboxGroup
        value={question.answer ?? getQuestionDefaultAnswer(question)}
        onChange={onChange}
      >
        <Stack>
          {question.options.map(option => (
            <Checkbox key={option} value={option}>
              {option}
            </Checkbox>
          ))}
        </Stack>
      </CheckboxGroup>
    );
  }
  return assertUnreachable(question);
};

export default getQuestionFormComponent;
