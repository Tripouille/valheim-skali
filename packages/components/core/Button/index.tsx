import React from 'react';
import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
  forwardRef,
} from '@chakra-ui/react';
import { ElementCategoriesProps } from '@packages/utils/types';
import { createDataAttributes } from '@packages/utils/dataAttributes/createDataAttributes';

export type ButtonProps = ChakraButtonProps & ElementCategoriesProps;

const Button = forwardRef<ButtonProps, 'button'>(
  ({ elementCategories, ...chakraButtonProps }, ref) => (
    <ChakraButton {...chakraButtonProps} ref={ref} {...createDataAttributes(elementCategories)} />
  ),
);

Button.displayName = 'Button';
export default Button;
