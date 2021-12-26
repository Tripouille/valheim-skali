import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import Header from './Header';

const Layout: React.FC = ({ children }) => (
  <Box
    h="100vh"
    bgImage="/images/valheim-background.png"
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
    >
      {children}
    </Flex>
  </Box>
);

export default Layout;
