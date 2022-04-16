import React from 'react';
import { Kbd as ChakraKbd, KbdProps as ChakraKbdProps } from '@chakra-ui/react';

export type InlineKbdProps = ChakraKbdProps;

const InlineKbd: React.FC<InlineKbdProps> = chakraKbdProps => (
  <ChakraKbd mx="2" fontSize="inherit" fontWeight="inherit" {...chakraKbdProps}></ChakraKbd>
);

export default InlineKbd;
