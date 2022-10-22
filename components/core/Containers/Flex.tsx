import { Flex as ChakraFlex, FlexProps as ChakraFlexProps, forwardRef } from '@chakra-ui/react';

export type FlexProps = ChakraFlexProps;

const Flex = forwardRef<FlexProps, 'div'>((chakraFlexProps, ref) => (
  <ChakraFlex {...chakraFlexProps} ref={ref}></ChakraFlex>
));

Flex.displayName = 'Flex';
export default Flex;
