import React from 'react';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import store from '@packages/store';
import Layout from '@packages/components/Layout';
import Fonts from '@packages/components/Layout/Fonts';
import theme from '@packages/theme';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <Provider store={store}>
          <Head>
            <title>Skali - Valhabba</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <link rel="preload" href="/fonts/Norse.otf" as="font" crossOrigin="" />
          </Head>
          <Fonts />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </ChakraProvider>
    </SessionProvider>
  );
}

export default MyApp;
