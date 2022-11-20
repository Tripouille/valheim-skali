import { useRadioGroup } from '@chakra-ui/react';
import { HStack } from 'components/core/Containers/Stack';
import FormElement from 'components/core/Form/FormElement';
import Textarea from 'components/core/Form/Textarea';
import {
  CreateQuestionData,
  MCQQuestion,
  QuestionType,
  QUESTION_TYPE_TO_LABEL,
} from 'data/rulesQuestionnaire';
import { Children, Setter } from 'utils/types';
import QuestionOptionsForm from './QuestionOptionsForm';
import QuestionTypeRadioButton from './QuestionTypeRadioButton';

interface QuestionFormProps {
  questionFormData: Partial<CreateQuestionData>;
  setQuestionFormData: Setter<Partial<CreateQuestionData>>;
  children?: Children;
}

const QuestionForm: React.FC<QuestionFormProps> = ({
  questionFormData,
  setQuestionFormData,
  children,
}) => {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'type',
    defaultValue: questionFormData.type,
    onChange: (type: QuestionType) =>
      setQuestionFormData({
        ...questionFormData,
        type,
        ...((type === 'single-choice' || type === 'multiple-choice') && {
          options: ('options' in questionFormData && questionFormData.options) || [],
        }),
      }),
  });

  const changeOptions = (options: string[]) => {
    setQuestionFormData(prev => ({
      ...(prev as Partial<MCQQuestion>),
      options,
    }));
  };

  return (
    <>
      <FormElement label="Type de question :" vertical>
        <HStack {...getRootProps()}>
          {Object.entries(QUESTION_TYPE_TO_LABEL).map(([value, label]) => {
            const radio = getRadioProps({ value });
            return (
              <QuestionTypeRadioButton key={value} {...radio}>
                {label}
              </QuestionTypeRadioButton>
            );
          })}
        </HStack>
      </FormElement>
      {questionFormData.type && (
        <>
          <Textarea
            value={questionFormData.label}
            onChange={label => setQuestionFormData({ ...questionFormData, label })}
          />
          {(questionFormData.type === 'single-choice' ||
            questionFormData.type === 'multiple-choice') && (
            <QuestionOptionsForm
              questionType={questionFormData.type}
              options={questionFormData.options || []}
              onChange={changeOptions}
            />
          )}
          {children}
        </>
      )}
    </>
  );
};

export default QuestionForm;
