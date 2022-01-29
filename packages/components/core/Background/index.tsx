import React from 'react';
import { chakra } from '@chakra-ui/react';
import { Children } from '@packages/utils/types';
import Box from '@packages/components/core/Box';

export interface BackgroundProps {
  className?: string;
  children: Children;
}

const Background: React.FC<BackgroundProps> = ({ children, className }) => (
  <Box
    bgColor="rgba(44, 82, 130, 0.95)"
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

export default chakra(Background);
