import React from 'react';
import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
  forwardRef,
} from '@chakra-ui/react';
import { DataAttributes } from '@packages/utils/dataAttributes';

export type ButtonProps = ChakraButtonProps & DataAttributes;

const Button = forwardRef<ButtonProps, 'button'>(({ dataCy, ...chakraButtonProps }, ref) => (
  <ChakraButton {...chakraButtonProps} data-cy={dataCy} ref={ref} />
));

Button.displayName = 'Button';
export default Button;
