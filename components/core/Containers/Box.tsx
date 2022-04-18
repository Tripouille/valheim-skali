import React from 'react';
import { Box as ChakraBox, BoxProps as ChakraBoxProps } from '@chakra-ui/react';

export type BoxProps = ChakraBoxProps;

const Box: React.FC<BoxProps> = chakraBoxProps => <ChakraBox {...chakraBoxProps}></ChakraBox>;

export default Box;
