import React from 'react';
import { Switch as ChakraSwitch, SwitchProps as ChakraSwitchProps } from '@chakra-ui/react';
import { CypressProps } from 'utils/types';

export type SwitchProps = Omit<ChakraSwitchProps, 'onChange'> &
  CypressProps & {
    onChange: (newValue: boolean) => void;
  };

const Switch: React.FC<SwitchProps> = ({ 'data-cy': dataCy, onChange, ...chakraSwitchProps }) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    onChange(e.target.checked);
  };

  return (
    <ChakraSwitch {...chakraSwitchProps} onChange={handleChange} data-cy={`${dataCy}-switch`} />
  );
};

export default Switch;
