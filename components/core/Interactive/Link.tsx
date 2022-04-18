import React from 'react';
import { Link as ChakraLink, LinkProps as ChakraLinkProps } from '@chakra-ui/react';

export type LinkProps = ChakraLinkProps;

const Link: React.FC<LinkProps> = chakraLinkProps => <ChakraLink {...chakraLinkProps}></ChakraLink>;

export default Link;
