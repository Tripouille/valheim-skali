import React from 'react';
import { Spinner as ChakraSpinner, SpinnerProps as ChakraSpinnerProps } from '@chakra-ui/react';

export type SpinnerProps = ChakraSpinnerProps;

const Spinner: React.FC<SpinnerProps> = chakraSpinnerProps => (
  <ChakraSpinner {...chakraSpinnerProps}></ChakraSpinner>
);

export default Spinner;
