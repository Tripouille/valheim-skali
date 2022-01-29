import React from 'react';
import { Text as ChakraText, TextProps as ChakraTextProps } from '@chakra-ui/react';

export type TextProps = ChakraTextProps;

const Text: React.FC<TextProps> = chakraTextProps => <ChakraText {...chakraTextProps}></ChakraText>;

export default Text;
