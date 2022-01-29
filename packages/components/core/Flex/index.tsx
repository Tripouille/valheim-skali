import React from 'react';
import { Flex as ChakraFlex, FlexProps as ChakraFlexProps } from '@chakra-ui/react';

export type FlexProps = ChakraFlexProps;

const Flex: React.FC<FlexProps> = chakraFlexProps => <ChakraFlex {...chakraFlexProps}></ChakraFlex>;

export default Flex;
