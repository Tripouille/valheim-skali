import React from 'react';
import {
  forwardRef,
  IconButton as ChakraIconButton,
  IconButtonProps as ChakraIconButtonProps,
} from '@chakra-ui/react';
import { DataAttributes } from '@packages/utils/types';

export type IconButtonProps = ChakraIconButtonProps & { href?: string } & DataAttributes;

const IconButton = forwardRef<IconButtonProps, 'button'>(
  ({ dataCy, ...chakraIconButtonProps }, ref) => (
    <ChakraIconButton {...chakraIconButtonProps} data-cy={dataCy} ref={ref}></ChakraIconButton>
  ),
);

IconButton.displayName = 'IconButton';
export default IconButton;
