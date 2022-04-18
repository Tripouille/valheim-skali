import React from 'react';
import { Select as ChakraSelect, SelectProps as ChakraSelectProps } from '@chakra-ui/react';

export type SelectProps<T> = Omit<ChakraSelectProps, 'onChange'> & {
  onChange: (newValue: T) => void;
};

const Select = <T extends string>({ onChange, ...chakraSelectProps }: SelectProps<T>) => {
  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = e => {
    onChange(e.target.value as T);
  };

  return <ChakraSelect {...chakraSelectProps} onChange={handleChange} />;
};

export default Select;
