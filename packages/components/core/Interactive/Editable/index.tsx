import React from 'react';
import { BiEdit } from 'react-icons/bi';
import {
  Editable as ChakraEditable,
  EditableInput,
  EditablePreview,
  EditableProps as ChakraEditableProps,
  useEditableControls,
} from '@chakra-ui/react';
import { getDataValue, DataAttributes } from '@packages/utils/dataAttributes';
import IconButton from '@packages/components/core/Interactive/IconButton';

const EditableControls: React.FC<DataAttributes> = ({ dataCy }) => {
  const { isEditing, getEditButtonProps } = useEditableControls();

  return isEditing ? null : (
    <IconButton
      dataCy={getDataValue(dataCy, 'edit_button')}
      aria-label="Modifier"
      icon={<BiEdit size="1.5em" />}
      {...getEditButtonProps()}
    />
  );
};

export type EditableProps = ChakraEditableProps & DataAttributes;

const Editable: React.FC<EditableProps> = ({ dataCy, ...chakraEditableProps }) => {
  return (
    <ChakraEditable {...chakraEditableProps} data-cy={dataCy}>
      {chakraEditableProps.value && <EditablePreview pe="5" />}
      <EditableInput />
      <EditableControls dataCy={dataCy} />
    </ChakraEditable>
  );
};

export default Editable;
