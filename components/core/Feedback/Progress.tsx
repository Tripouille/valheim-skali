import React from 'react';
import { Progress as ChakraProgress, ProgressProps as ChakraProgressProps } from '@chakra-ui/react';

export type ProgressProps = ChakraProgressProps;

const Progress: React.FC<ProgressProps> = chakraProgressProps => (
  <ChakraProgress {...chakraProgressProps}></ChakraProgress>
);

export default Progress;
