import React from 'react';
import { Select as ChakraSelect, SelectProps as ChakraSelectProps } from '@chakra-ui/react';
import { CypressProps } from 'utils/types';

export type SelectProps<T> = Omit<ChakraSelectProps, 'onChange'> &
  CypressProps & {
    onChange: (newValue: T) => void;
  };

const Select = <T extends string>({
  'data-cy': dataCy,
  onChange,
  ...chakraSelectProps
}: SelectProps<T>) => {
  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = e => {
    onChange(e.target.value as T);
  };

  return <ChakraSelect {...chakraSelectProps} onChange={handleChange} data-cy={dataCy} />;
};

export default Select;
