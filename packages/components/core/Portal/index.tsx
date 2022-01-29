import React from 'react';
import { Portal as ChakraPortal, PortalProps as ChakraPortalProps } from '@chakra-ui/react';

export type PortalProps = ChakraPortalProps;

const Portal: React.FC<PortalProps> = chakraPortalProps => (
  <ChakraPortal {...chakraPortalProps}></ChakraPortal>
);

export default Portal;
