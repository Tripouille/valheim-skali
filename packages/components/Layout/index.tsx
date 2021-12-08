import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import Header from './Header';

const Layout: React.FC = ({ children }) => (
  <Box
    h="100vh"
    overflow="hidden"
    bgImage="/images/valheim-background.png"
    bgAttachment="fixed"
    bgSize="cover"
    bgPos="bottom">
    <Header />
    <Flex h="calc(100vh - var(--chakra-sizes-header))" overflow="auto" justify="center" p="2">
      {children}
    </Flex>
  </Box>
);

export default Layout;
