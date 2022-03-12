import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ChakraProvider } from '@chakra-ui/react';
import Layout from '@packages/components/Layout';
import Fonts from '@packages/components/Layout/Fonts';
import theme from '@packages/theme';
import { queryClient } from '@packages/utils/queryClient';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ChakraProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>Skali - Valhabba</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="preload" href="/fonts/Norse.otf" as="font" crossOrigin="" />
      </Head>
      <Fonts />
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </ChakraProvider>
);

export default MyApp;
