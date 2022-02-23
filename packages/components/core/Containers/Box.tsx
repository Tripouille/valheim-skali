import React from 'react';
import { Box as ChakraBox, BoxProps as ChakraBoxProps } from '@chakra-ui/react';
import { DataAttributes } from '@packages/utils/dataAttributes';

export type BoxProps = ChakraBoxProps & Partial<DataAttributes>;

const Box: React.FC<BoxProps> = ({ dataCy, ...chakraBoxProps }) => (
  <ChakraBox {...chakraBoxProps} data-cy={dataCy}></ChakraBox>
);

export default Box;
