import React, { ForwardRefRenderFunction } from 'react';
import { Button as ChakraButton, ButtonProps as ChakraButtonProps } from '@chakra-ui/react';
import { ElementCategoriesProps } from '@packages/utils/types';
import { createDataAttributes } from '@packages/utils/dataAttributes/createDataAttributes';

export type ButtonProps = ChakraButtonProps & ElementCategoriesProps;

const Button: ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = (
  { elementCategories, ...chakraButtonProps },
  ref,
) => (
  <ChakraButton
    {...chakraButtonProps}
    {...createDataAttributes(elementCategories)}
    ref={ref}
  ></ChakraButton>
);

export default React.forwardRef(Button);
