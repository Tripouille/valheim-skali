import { NextComponentType } from 'next';
import type { AppInitialProps } from 'next/app';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';
import React from 'react';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import { AuthConfig } from '@packages/utils/auth';
import store from '@packages/store';
import Layout from '@packages/components/Layout';
import Fonts from '@packages/components/Layout/Fonts';
import theme from '@packages/theme';
import SecuredPage from '@packages/components/core/Authentication/SecuredPage';

type MyAppProps = AppInitialProps & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component: NextComponentType & AuthConfig;
};

const MyApp = ({ Component, pageProps: { session, ...pageProps } }: MyAppProps) => (
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
          {Component.needAuth ? (
            <SecuredPage permissions={Component.needAuth.permissions}>
              <Component {...pageProps} />
            </SecuredPage>
          ) : (
            <Component {...pageProps} />
          )}
        </Layout>
      </Provider>
    </ChakraProvider>
  </SessionProvider>
);

export default MyApp;
