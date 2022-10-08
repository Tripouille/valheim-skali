import Router from 'next/router';
import React, { useEffect, useRef } from 'react';
import { useBoolean } from '@chakra-ui/react';
import Flex from 'components/core/Containers/Flex';
import Box from 'components/core/Containers/Box';
import Progress from 'components/core/Feedback/Progress';
import NavBar from './NavBar';

const Layout: React.FC = ({ children }) => {
  const main = useRef<HTMLDivElement>(null);
  const [showLoadingBar, setShowLoadingBar] = useBoolean(false);

  useEffect(() => {
    const routeChangeStart = () => setShowLoadingBar.on();
    const routeChangeEnd = (url: unknown, { shallow }: { shallow: boolean }) => {
      setShowLoadingBar.off();
      if (!shallow) main.current?.scroll({ top: 0, left: 0 });
    };

    Router.events.on('routeChangeStart', routeChangeStart);
    Router.events.on('routeChangeComplete', routeChangeEnd);
    Router.events.on('routeChangeError', routeChangeEnd);

    return () => {
      Router.events.off('routeChangeStart', routeChangeStart);
      Router.events.off('routeChangeComplete', routeChangeEnd);
      Router.events.off('routeChangeError', routeChangeEnd);
    };
  }, [setShowLoadingBar]);

  return (
    <Box
      position="relative"
      h="100vh"
      bgImage="/images/valheim-background-q60.jpg"
      bgAttachment="fixed"
      bgSize="cover"
      bgPos="bottom"
    >
      <NavBar />
      {showLoadingBar && <Progress position="absolute" width="100%" size="xs" isIndeterminate />}
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
