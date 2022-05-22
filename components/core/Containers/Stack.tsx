import React from 'react';
import {
  Stack as ChakraStack,
  HStack as ChakraHStack,
  VStack as ChakraVStack,
  StackProps as ChakraStackProps,
  forwardRef,
} from '@chakra-ui/react';

export type StackProps = ChakraStackProps;

export const Stack = forwardRef<StackProps, 'div'>((chakraStackProps, ref) => (
  <ChakraStack {...chakraStackProps} ref={ref}></ChakraStack>
));
Stack.displayName = 'Stack';

export const HStack: React.FC<StackProps> = chakraStackProps => (
  <ChakraHStack {...chakraStackProps}></ChakraHStack>
);

export const VStack: React.FC<StackProps> = chakraStackProps => (
  <ChakraVStack {...chakraStackProps}></ChakraVStack>
);
