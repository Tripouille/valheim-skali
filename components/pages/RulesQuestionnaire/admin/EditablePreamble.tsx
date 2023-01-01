import { useState } from 'react';
import { useBoolean } from '@chakra-ui/react';
import Flex from 'components/core/Containers/Flex';
import FromMarkup from 'components/core/DataDisplay/FromMarkup';
import FormElement from 'components/core/Form/FormElement';
import Textarea from 'components/core/Form/Textarea';
import Text from 'components/core/Typography/Text';
import useEditPreamble from 'hooks/rules-questionnaire/useEditPreamble';
import EditableQuestionControls from './EditableQuestionControls';

interface EditablePreambleProps {
  initialValue: string;
}

const EditablePreamble: React.FC<EditablePreambleProps> = ({ initialValue }) => {
  const [isEditing, setIsEditing] = useBoolean(false);
  const [value, setValue] = useState(initialValue);
  const editPreamble = useEditPreamble({ onSuccess: setIsEditing.off });

  const onCancel = () => {
    setValue(initialValue);
    setIsEditing.off();
  };

  return (
    <FormElement
      label="Préambule :"
      hint="Le préambule sera affiché en haut du questionnaire."
      vertical
      fontStyle="italic"
    >
      <Flex gap={2}>
        {isEditing ? (
          <Textarea value={value} onChange={setValue} />
        ) : initialValue ? (
          <FromMarkup content={initialValue} />
        ) : (
          <Text width="full" fontStyle="italic">
            (Pas de préambule)
          </Text>
        )}
        <EditableQuestionControls
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          canSubmit={value !== initialValue}
          onSubmit={() => editPreamble(value)}
          onCancel={onCancel}
          canMoveUp={false}
          canMoveDown={false}
        />
      </Flex>
    </FormElement>
  );
};

export default EditablePreamble;
