import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import Header from './Header';

const Layout: React.FC = ({ children }) => (
  <Box
    h="100vh"
    bgImage="/images/valheim-background-q60.jpg"
    bgAttachment="fixed"
    bgSize="cover"
    bgPos="bottom"
  >
    <Header />
    <Flex
      as="main"
      h="calc(100vh - var(--chakra-sizes-header))"
      overflowX="hidden"
      overflowY="auto"
      justify="center"
      p="2"
      css={{ overflow: 'overlay' }}
    >
      {children}
    </Flex>
  </Box>
);

export default Layout;
