import { useState } from 'react';
import { useBoolean } from '@chakra-ui/react';
import Flex from 'components/core/Containers/Flex';
import { FormControl, FormHelperText, FormLabel } from 'components/core/Form/FormControl';
import Input from 'components/core/Form/Input';
import useEditQuestionsNumber from 'hooks/rules-questionnaire/useEditQuestionsNumber';
import EditableQuestionControls from './EditableQuestionControls';

interface EditableQuestionsNumberProps {
  initialValue: number;
}

const EditableQuestionsNumber: React.FC<EditableQuestionsNumberProps> = ({ initialValue }) => {
  const [isEditing, setIsEditing] = useBoolean(false);
  const [value, setValue] = useState(initialValue);
  const editQuestionsNumber = useEditQuestionsNumber({ onSuccess: setIsEditing.off });

  const onCancel = () => {
    setValue(initialValue);
    setIsEditing.off();
  };

  return (
    <FormControl>
      <Flex alignItems="center" gap={3}>
        <FormLabel fontWeight="normal">Nombre total de questions :</FormLabel>
        {isEditing ? (
          <Input
            type="number"
            value={value}
            onChange={(newValue: string) => setValue(parseInt(newValue))}
            width="16"
            height="9"
            p={3}
          />
        ) : (
          initialValue
        )}
        <EditableQuestionControls
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          canSubmit={value !== initialValue}
          onSubmit={() => editQuestionsNumber(value)}
          onCancel={onCancel}
          canMoveUp={false}
          canMoveDown={false}
          horizontal
        />
        <FormHelperText gridColumn="2 / 2" wordBreak="break-word">
          Ce nombre comprend les questions toujours incluses et les questions toujours au début ou à
          la fin.
        </FormHelperText>
      </Flex>
    </FormControl>
  );
};

export default EditableQuestionsNumber;
