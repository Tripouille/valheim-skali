import React from 'react';
import { Code as ChakraCode, CodeProps as ChakraCodeProps } from '@chakra-ui/react';

export type CodeProps = ChakraCodeProps;

const Code: React.FC<CodeProps> = chakraCodeProps => <ChakraCode {...chakraCodeProps}></ChakraCode>;

export default Code;
