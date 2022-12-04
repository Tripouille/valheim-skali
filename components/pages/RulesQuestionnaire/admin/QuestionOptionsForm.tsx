import { MouseEventHandler, useRef, useState } from 'react';
import { BiCheckbox, BiRadioCircle } from 'react-icons/bi';
import { BsDashLg, BsPlusLg } from 'react-icons/bs';
import Flex from 'components/core/Containers/Flex';
import IconList from 'components/core/DataDisplay/IconList';
import Input from 'components/core/Form/Input';
import IconButton from 'components/core/Interactive/IconButton';
import theme from 'theme';

interface QuestionOptionFormProps {
  option: string;
  onChange: (value: string) => void;
  onRemove: () => void;
}

const QuestionOptionForm: React.FC<QuestionOptionFormProps> = ({ option, onChange, onRemove }) => {
  return (
    <Flex gap={2} align="center" width={`min(100%, ${theme.sizes.xl})`}>
      <Input value={option} onChange={onChange} />
      <IconButton
        data-cy="delete-option"
        title="Supprimer"
        aria-label="Supprimer"
        icon={<BsDashLg />}
        colorScheme="red"
        size="sm"
        onClick={onRemove}
      />
    </Flex>
  );
};

interface QuestionOptionsFormProps {
  questionType: 'single-choice' | 'multiple-choice';
  options: string[];
  onChange: (options: string[]) => void;
}

const QuestionOptionsForm: React.FC<QuestionOptionsFormProps> = ({
  questionType,
  options,
  onChange,
}) => {
  const [newOption, setNewOption] = useState('');
  const newOptionInputRef = useRef<HTMLInputElement>(null);

  const addNewOption: MouseEventHandler<HTMLButtonElement> = () => {
    onChange([...options, newOption]);
    setNewOption('');
    setTimeout(() => newOptionInputRef.current?.focus());
  };

  const changeOption = (changedIndex: number) => (value: string) => {
    onChange(options.map((option, index) => (index === changedIndex ? value : option)));
  };

  const removeOption = (removedIndex: number) => () => {
    onChange(options.filter((_, index) => index !== removedIndex));
    setTimeout(() => newOptionInputRef.current?.focus());
  };

  return (
    <IconList
      icon={questionType === 'single-choice' ? BiRadioCircle : BiCheckbox}
      marginStart={3}
      list={[
        ...options.map((option, index) => (
          <QuestionOptionForm
            key={index}
            option={option}
            onChange={changeOption(index)}
            onRemove={removeOption(index)}
          />
        )),
        <Flex key="new" gap={2} align="center" width={`min(100%, ${theme.sizes.xl})`}>
          <Input
            data-cy="new-option"
            ref={newOptionInputRef}
            showInvalidOverFocus
            value={newOption}
            onChange={setNewOption}
            placeholder="Nouveau choix"
          />
          <IconButton
            data-cy="add-option"
            type="submit"
            title="Ajouter"
            aria-label="Ajouter"
            icon={<BsPlusLg />}
            colorScheme="green"
            size="sm"
            onClick={addNewOption}
            disabled={
              newOption.trim().length === 0 ||
              options.some(option => option.trim() === newOption.trim())
            }
          />
        </Flex>,
      ]}
    />
  );
};

export default QuestionOptionsForm;
