import Router from 'next/router';
import React, { useEffect, useRef } from 'react';
import NavBar from './NavBar';
import Flex from 'components/core/Containers/Flex';
import Box from 'components/core/Containers/Box';

const Layout: React.FC = ({ children }) => {
  const main = useRef<HTMLDivElement>(null);

  useEffect(
    () =>
      Router.events.on('routeChangeComplete', () => {
        main.current?.scroll({
          top: 0,
          left: 0,
        });
      }),
    [],
  );

  return (
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
        ref={main}
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
};

export default Layout;
