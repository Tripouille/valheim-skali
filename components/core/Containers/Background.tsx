import React from 'react';
import { As, chakra, shouldForwardProp } from '@chakra-ui/react';
import { CypressProps, Children } from 'utils/types';
import Box from 'components/core/Containers/Box';

export interface BackgroundProps extends Partial<CypressProps> {
  className?: string;
  as?: As;
  children: Children;
}

const Background: React.FC<BackgroundProps> = ({ 'data-cy': dataCy, children, className, as }) => (
  <Box
    data-cy={dataCy}
    as={as}
    bgColor="background"
    h="min-content"
    minH="full"
    w="8xl"
    maxW="full"
    borderRadius="xl"
    p={[2, 4, 6, 8, 10]}
    className={className}
  >
    {children}
  </Box>
);

export default chakra(Background, {
  shouldForwardProp: prop => (prop === 'as' ? true : shouldForwardProp(prop)),
});
