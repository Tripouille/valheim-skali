import React from 'react';
import { Icon as ChakraIcon, PropsOf } from '@chakra-ui/react';

export type IconProps = PropsOf<typeof ChakraIcon>;

const Icon: React.FC<IconProps> = chakraIconProps => <ChakraIcon {...chakraIconProps}></ChakraIcon>;

export default Icon;
