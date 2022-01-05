import React from 'react';
import { Button as ChakraButton, ButtonProps as ChakraButtonProps } from '@chakra-ui/react';
import { ElementCategoriesProps } from '@packages/utils/types';
import { createDataAttributes } from '@packages/utils/dataAttributes/createDataAttributes';

export type ButtonProps = ChakraButtonProps & ElementCategoriesProps;

const Button: React.FC<ButtonProps> = ({ elementCategories, ...chakraButtonProps }) => (
  <ChakraButton {...chakraButtonProps} {...createDataAttributes(elementCategories)}></ChakraButton>
);

export default Button;
