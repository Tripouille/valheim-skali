import React from 'react';
import { chakra, Flex } from '@chakra-ui/react';

export interface BackgroundProps {
  className?: string;
}

const Background: React.FC<BackgroundProps> = ({ children, className }) => (
  <Flex
    bgColor="blue.700"
    h="min-content"
    minH="full"
    w="full"
    opacity="0.9"
    borderRadius="xl"
    p={[2, 4, 6, 8, 10]}
    flexDir="column"
    alignItems="center"
    className={className}
  >
    {children}
  </Flex>
);

export default chakra(Background);
