import React from 'react';
import { chakra, Box } from '@chakra-ui/react';

export interface BackgroundProps {
  className?: string;
}

const Background: React.FC<BackgroundProps> = ({ children, className }) => (
  <Box
    bgColor="rgba(44, 82, 130, 0.95)"
    h="min-content"
    minH="full"
    w="full"
    borderRadius="xl"
    p={[2, 4, 6, 8, 10]}
    className={className}
  >
    {children}
  </Box>
);

export default chakra(Background);