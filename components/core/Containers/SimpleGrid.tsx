import React from 'react';
import {
  SimpleGrid as ChakraSimpleGrid,
  SimpleGridProps as ChakraSimpleGridProps,
  forwardRef,
} from '@chakra-ui/react';

export type SimpleGridProps = ChakraSimpleGridProps;

const SimpleGrid = forwardRef<SimpleGridProps, 'div'>((chakraSimpleGridProps, ref) => (
  <ChakraSimpleGrid {...chakraSimpleGridProps} ref={ref}></ChakraSimpleGrid>
));

SimpleGrid.displayName = 'SimpleGrid';
export default SimpleGrid;
