import React from 'react';
import { Select as ChakraSelect, SelectProps as ChakraSelectProps } from '@chakra-ui/react';
import { DataAttributes } from '@packages/utils/dataAttributes';

export type SelectProps<T> = Omit<ChakraSelectProps, 'onChange'> &
  DataAttributes & {
    onChange: (newValue: T) => void;
  };

const Select = <T extends string>({ dataCy, onChange, ...chakraSelectProps }: SelectProps<T>) => {
  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = e => {
    onChange(e.target.value as T);
  };

  return <ChakraSelect {...chakraSelectProps} data-cy={dataCy} onChange={handleChange} />;
};

export default Select;
