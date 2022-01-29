import React from 'react';
import { Center as ChakraCenter, CenterProps as ChakraCenterProps } from '@chakra-ui/react';

export type CenterProps = ChakraCenterProps;

const Center: React.FC<CenterProps> = chakraCenterProps => (
  <ChakraCenter {...chakraCenterProps}></ChakraCenter>
);

export default Center;
