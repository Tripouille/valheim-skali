import { Box as ChakraBox, BoxProps as ChakraBoxProps, forwardRef } from '@chakra-ui/react';

export type BoxProps = ChakraBoxProps;

const Box = forwardRef<BoxProps, 'div'>((chakraBoxProps, ref) => (
  <ChakraBox ref={ref} {...chakraBoxProps}></ChakraBox>
));

export default Box;
