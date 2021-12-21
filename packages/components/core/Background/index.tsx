import React from 'react';
import { chakra, Box } from '@chakra-ui/react';

export interface BackgroundProps {
  className?: string;
}

const Background: React.FC<BackgroundProps> = ({ children, className }) => (
  <Box
    bgColor="blue.700"
    h="min-content"
    minH="full"
    w="full"
    opacity="0.95"
    borderRadius="xl"
    p={[2, 4, 6, 8, 10]}
    className={className}
  >
    {children}
  </Box>
);

export default chakra(Background);
