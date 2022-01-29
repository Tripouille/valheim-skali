import React from 'react';
import NavBar from './NavBar';
import Flex from '@packages/components/core/Flex';
import Box from '@packages/components/core/Box';

const Layout: React.FC = ({ children }) => (
  <Box
    h="100vh"
    bgImage="/images/valheim-background-q60.jpg"
    bgAttachment="fixed"
    bgSize="cover"
    bgPos="bottom"
  >
    <NavBar />
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
