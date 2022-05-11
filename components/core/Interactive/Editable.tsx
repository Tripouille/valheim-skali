import React, { useEffect, useState } from 'react';
import { BiEdit } from 'react-icons/bi';
import {
  Editable as ChakraEditable,
  EditableInput,
  EditableInputProps,
  EditablePreview,
  EditableProps as ChakraEditableProps,
  useEditableControls,
} from '@chakra-ui/react';
import IconButton from 'components/core/Interactive/IconButton';

const EditableControls = () => {
  const { isEditing, getEditButtonProps } = useEditableControls();

  return isEditing ? null : (
    <IconButton aria-label="Modifier" icon={<BiEdit size="1.5em" />} {...getEditButtonProps()} />
  );
};

export type EditableProps = Omit<ChakraEditableProps, 'value'> & {
  initialValue?: ChakraEditableProps['value'];
  inputProps?: EditableInputProps;
};

const Editable: React.FC<EditableProps> = ({
  initialValue,
  inputProps,
  ...chakraEditableProps
}) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => setValue(initialValue), [initialValue]);

  const handleChange = (nextValue: string) => {
    setValue(nextValue);
    if (chakraEditableProps.onChange) chakraEditableProps.onChange(nextValue);
  };

  return (
    <ChakraEditable fontSize="md" {...chakraEditableProps} value={value} onChange={handleChange}>
      {value && <EditablePreview pe="5" />}
      <EditableInput {...inputProps} />
      <EditableControls />
    </ChakraEditable>
  );
};

export default Editable;
