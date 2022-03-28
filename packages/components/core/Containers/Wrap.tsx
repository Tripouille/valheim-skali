import React from 'react';
import {
  Wrap as ChakraWrap,
  WrapProps as ChakraWrapProps,
  WrapItem as ChakraWrapItem,
  WrapItemProps as ChakraWrapItemProps,
  forwardRef,
} from '@chakra-ui/react';

export type WrapProps = ChakraWrapProps;

export const Wrap = forwardRef<WrapProps, 'div'>((chakraWrapProps, ref) => (
  <ChakraWrap shouldWrapChildren {...chakraWrapProps} ref={ref}></ChakraWrap>
));

export type WrapItemProps = ChakraWrapItemProps;

export const WrapItem: React.FC<WrapItemProps> = chakraWrapItemProps => (
  <ChakraWrapItem {...chakraWrapItemProps}></ChakraWrapItem>
);
