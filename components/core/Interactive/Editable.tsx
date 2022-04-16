import React, { useEffect, useState } from 'react';
import { BiEdit } from 'react-icons/bi';
import {
  Editable as ChakraEditable,
  EditableInput,
  EditablePreview,
  EditableProps as ChakraEditableProps,
  useEditableControls,
} from '@chakra-ui/react';
import { getDataValue, DataAttributes } from 'utils/dataAttributes';
import IconButton from 'components/core/Interactive/IconButton';

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

export type EditableProps = Omit<ChakraEditableProps, 'value'> & {
  initialValue?: ChakraEditableProps['value'];
} & DataAttributes;

const Editable: React.FC<EditableProps> = ({ dataCy, initialValue, ...chakraEditableProps }) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => setValue(initialValue), [initialValue]);

  const handleChange = (nextValue: string) => {
    setValue(nextValue);
    if (chakraEditableProps.onChange) chakraEditableProps.onChange(nextValue);
  };

  return (
    <ChakraEditable
      fontSize="md"
      {...chakraEditableProps}
      value={value}
      onChange={handleChange}
      data-cy={dataCy}
    >
      {value && <EditablePreview pe="5" />}
      <EditableInput />
      <EditableControls dataCy={dataCy} />
    </ChakraEditable>
  );
};

export default Editable;
