import { AppContext, AppProps } from 'next/app';
import Head from 'next/head';
import { getSession } from 'next-auth/react';
import React from 'react';
import { QueryClientProvider, dehydrate, QueryClient, Hydrate } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ChakraProvider } from '@chakra-ui/react';
import Layout from '@packages/components/Layout';
import Fonts from '@packages/components/Layout/Fonts';
import theme from '@packages/theme';
import { queryClient, QueryKeys } from '@packages/utils/queryClient';
import { HydrationProps } from '@packages/utils/types';

/** Page props are those of getServerSideProps (if defined in page),
 * initial props are returned by MyApp.getInitialProps */
const MyApp = ({
  Component,
  pageProps,
  initialProps,
}: AppProps & { initialProps: HydrationProps }) => (
  <ChakraProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <Hydrate state={initialProps.dehydratedState}>
        <Hydrate
          state={
            pageProps && pageProps.dehydratedState
              ? JSON.parse(pageProps.dehydratedState)
              : undefined
          }
        >
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
        </Hydrate>
      </Hydrate>
    </QueryClientProvider>
  </ChakraProvider>
);

MyApp.getInitialProps = async (appContext: AppContext) => {
  const req = appContext.ctx.req;

  const serverQueryClient = new QueryClient();
  const session = await getSession({ req });
  serverQueryClient.setQueryData(QueryKeys.SESSION, session);

  return {
    initialProps: {
      dehydratedState: dehydrate(serverQueryClient),
    },
  };
};

export default MyApp;
