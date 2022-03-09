import React from 'react';
import { Switch as ChakraSwitch, SwitchProps as ChakraSwitchProps } from '@chakra-ui/react';
import { DataAttributes } from '@packages/utils/dataAttributes';

export type SwitchProps = Omit<ChakraSwitchProps, 'onChange'> &
  DataAttributes & {
    onChange: (newValue: boolean) => void;
  };

const Switch: React.FC<SwitchProps> = ({ dataCy, onChange, ...chakraSwitchProps }) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    onChange(e.target.checked);
  };

  return <ChakraSwitch {...chakraSwitchProps} data-cy={dataCy} onChange={handleChange} />;
};

export default Switch;
