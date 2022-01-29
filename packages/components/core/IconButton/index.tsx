import React from 'react';
import {
  forwardRef,
  IconButton as ChakraIconButton,
  IconButtonProps as ChakraIconButtonProps,
} from '@chakra-ui/react';
import { ElementCategoriesProps } from '@packages/utils/types';
import { createDataAttributes } from '@packages/utils/dataAttributes/createDataAttributes';

export type IconButtonProps = ChakraIconButtonProps & { href?: string } & ElementCategoriesProps;

const IconButton = forwardRef<IconButtonProps, 'button'>(
  ({ elementCategories, ...chakraIconButtonProps }, ref) => (
    <ChakraIconButton
      {...chakraIconButtonProps}
      ref={ref}
      {...createDataAttributes(elementCategories)}
    ></ChakraIconButton>
  ),
);

IconButton.displayName = 'IconButton';
export default IconButton;
