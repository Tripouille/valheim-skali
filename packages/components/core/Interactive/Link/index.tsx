import React from 'react';
import { Link as ChakraLink, LinkProps as ChakraLinkProps } from '@chakra-ui/react';
import { DataAttributes } from '@packages/utils/types';

export type LinkProps = ChakraLinkProps & DataAttributes;

const Link: React.FC<LinkProps> = ({ dataCy, ...chakraLinkProps }) => (
  <ChakraLink {...chakraLinkProps} data-cy={dataCy}></ChakraLink>
);

export default Link;
