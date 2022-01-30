import React from 'react';
import {
  ButtonGroup as ChakraButtonGroup,
  ButtonGroupProps as ChakraButtonGroupProps,
} from '@chakra-ui/react';

export type ButtonGroupProps = ChakraButtonGroupProps;

const ButtonGroup: React.FC<ButtonGroupProps> = chakraButtonGroupProps => (
  <ChakraButtonGroup {...chakraButtonGroupProps}></ChakraButtonGroup>
);

export default ButtonGroup;
