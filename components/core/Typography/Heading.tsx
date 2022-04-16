import React from 'react';
import { Heading as ChakraHeading, HeadingProps as ChakraHeadingProps } from '@chakra-ui/react';

export type HeadingProps = ChakraHeadingProps;

const Heading: React.FC<HeadingProps> = chakraHeadingProps => (
  <ChakraHeading {...chakraHeadingProps}></ChakraHeading>
);

export default Heading;
