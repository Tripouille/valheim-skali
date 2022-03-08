import React from 'react';
import { Input as ChakraInput, InputProps as ChakraInputProps } from '@chakra-ui/react';
import { DataAttributes } from '@packages/utils/dataAttributes';

export type InputProps = Omit<ChakraInputProps, 'onChange'> &
  DataAttributes & {
    onChange: (newValue: string) => void;
  };

const Input: React.FC<InputProps> = ({ dataCy, onChange, ...chakraInputProps }) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    onChange(e.target.value);
  };

  return <ChakraInput {...chakraInputProps} data-cy={dataCy} onChange={handleChange} />;
};

export default Input;
