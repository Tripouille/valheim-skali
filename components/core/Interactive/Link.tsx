import { forwardRef, Link as ChakraLink, LinkProps as ChakraLinkProps } from '@chakra-ui/react';

export type LinkProps = ChakraLinkProps;

const Link = forwardRef<LinkProps, 'a'>((chakraLinkProps, ref) => (
  <ChakraLink color="#c2e6ff" {...chakraLinkProps} ref={ref}></ChakraLink>
));

Link.displayName = 'Link';
export default Link;
