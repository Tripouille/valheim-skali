import React from 'react';
import {
  forwardRef,
  IconButton as ChakraIconButton,
  IconButtonProps as ChakraIconButtonProps,
} from '@chakra-ui/react';
import { DataAttributes } from '@packages/utils/dataAttributes';

export type IconButtonProps = ChakraIconButtonProps & DataAttributes;

const IconButton = forwardRef<IconButtonProps, 'button'>(
  ({ dataCy, ...chakraIconButtonProps }, ref) => (
    <ChakraIconButton {...chakraIconButtonProps} data-cy={dataCy} ref={ref}></ChakraIconButton>
  ),
);

IconButton.displayName = 'IconButton';
export default IconButton;
