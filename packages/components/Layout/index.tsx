import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import Header from './Header';

const Layout: React.FC = ({ children }) => (
  <Box bgImage="/images/valheim-background.png" bgAttachment="fixed" bgSize="cover" bgPos="bottom">
    <Header />
    <Flex
      h="calc(100vh - var(--chakra-sizes-header))"
      overflow="auto"
      justify="center"
      align="center">
      {children}
    </Flex>
  </Box>
);

export default Layout;
