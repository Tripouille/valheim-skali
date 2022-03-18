import React from 'react';
import {
  Wrap as ChakraWrap,
  WrapProps as ChakraWrapProps,
  WrapItem as ChakraWrapItem,
  WrapItemProps as ChakraWrapItemProps,
} from '@chakra-ui/react';

export type WrapProps = ChakraWrapProps;

export const Wrap: React.FC<WrapProps> = chakraWrapProps => (
  <ChakraWrap shouldWrapChildren {...chakraWrapProps}></ChakraWrap>
);

export type WrapItemProps = ChakraWrapItemProps;

export const WrapItem: React.FC<WrapItemProps> = chakraWrapItemProps => (
  <ChakraWrapItem {...chakraWrapItemProps}></ChakraWrapItem>
);
