import { NextComponentType } from 'next';
import type { AppInitialProps } from 'next/app';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';
import React from 'react';
import { QueryClientProvider } from 'react-query';
import { ChakraProvider } from '@chakra-ui/react';
import { AuthConfig } from '@packages/utils/auth';
import Layout from '@packages/components/Layout';
import Fonts from '@packages/components/Layout/Fonts';
import theme from '@packages/theme';
import SecuredPage from '@packages/components/core/Authentication/SecuredPage';
import { queryClient } from '@packages/utils/queryClient';

type MyAppProps = AppInitialProps & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component: NextComponentType & AuthConfig;
};

const MyApp = ({ Component, pageProps: { session, ...pageProps } }: MyAppProps) => (
  <SessionProvider session={session}>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
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
      </ChakraProvider>
    </QueryClientProvider>
  </SessionProvider>
);

export default MyApp;
