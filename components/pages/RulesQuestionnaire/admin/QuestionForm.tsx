import { useRadioGroup } from '@chakra-ui/react';
import Flex from 'components/core/Containers/Flex';
import { HStack } from 'components/core/Containers/Stack';
import FormElement from 'components/core/Form/FormElement';
import Select from 'components/core/Form/Select';
import Switch from 'components/core/Form/Switch';
import Textarea from 'components/core/Form/Textarea';
import {
  CreateQuestionData,
  MCQQuestion,
  QuestionPositionType,
  QuestionType,
  QUESTION_POSITION_TO_LABEL,
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

  const changePositionType = (positionType: QuestionPositionType) => {
    setQuestionFormData(prev => ({
      ...prev,
      positionType,
    }));
  };

  const changeOptions = (options: string[]) => {
    setQuestionFormData(prev => ({
      ...(prev as Partial<MCQQuestion>),
      options,
    }));
  };

  return (
    <>
      <Flex columnGap={8} rowGap={3} wrap="wrap">
        <FormElement label="Type de question :" vertical width="max-content">
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
        <FormElement label="Position :" vertical width="max-content">
          <Select value={questionFormData.positionType} onChange={changePositionType}>
            {Object.entries(QUESTION_POSITION_TO_LABEL).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Select>
        </FormElement>
        <FormElement label="Toujours incluse :" vertical width="max-content">
          <Switch
            data-cy="always-included"
            isChecked={questionFormData.alwaysIncluded}
            onChange={alwaysIncluded =>
              setQuestionFormData({ ...questionFormData, alwaysIncluded })
            }
            size="lg"
            marginTop={1}
          />
        </FormElement>
      </Flex>
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
