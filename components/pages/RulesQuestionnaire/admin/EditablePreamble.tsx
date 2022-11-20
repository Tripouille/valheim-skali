import { useState } from 'react';
import { useBoolean } from '@chakra-ui/react';
import Flex from 'components/core/Containers/Flex';
import FromMarkup from 'components/core/DataDisplay/FromMarkup';
import FormElement from 'components/core/Form/FormElement';
import Textarea from 'components/core/Form/Textarea';
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
    >
      <Flex gap={2}>
        {isEditing ? (
          <Textarea value={value} onChange={setValue} />
        ) : (
          <FromMarkup content={initialValue} />
        )}
        <EditableQuestionControls
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          canSubmit={value !== initialValue}
          onSubmit={() => editPreamble(value)}
          onCancel={onCancel}
        />
      </Flex>
    </FormElement>
  );
};

export default EditablePreamble;
