import React from 'react';
import {
  Stack as ChakraStack,
  HStack as ChakraHStack,
  VStack as ChakraVStack,
  StackProps as ChakraStackProps,
} from '@chakra-ui/react';

export type StackProps = ChakraStackProps;

export const Stack: React.FC<StackProps> = chakraStackProps => (
  <ChakraStack {...chakraStackProps}></ChakraStack>
);

export const HStack: React.FC<StackProps> = chakraStackProps => (
  <ChakraHStack {...chakraStackProps}></ChakraHStack>
);

export const VStack: React.FC<StackProps> = chakraStackProps => (
  <ChakraVStack {...chakraStackProps}></ChakraVStack>
);
