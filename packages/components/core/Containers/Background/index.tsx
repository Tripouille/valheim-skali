import React from 'react';
import { chakra } from '@chakra-ui/react';
import { Children } from '@packages/utils/types';
import Box from '@packages/components/core/Containers/Box';
import theme from '@packages/theme';

export interface BackgroundProps {
  className?: string;
  children: Children;
}

const Background: React.FC<BackgroundProps> = ({ children, className }) => (
  <Box
    bgColor={theme.colors.background}
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
