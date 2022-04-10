import { AppContext, AppProps } from 'next/app';
import Head from 'next/head';
import { getSession } from 'next-auth/react';
import React from 'react';
import { QueryClientProvider, Hydrate } from 'react-query';
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
  layoutProps,
}: AppProps & { layoutProps: HydrationProps }) => {
  const layoutState =
    layoutProps && layoutProps.dehydratedState
      ? JSON.parse(layoutProps.dehydratedState)
      : undefined;
  const pageState =
    pageProps && pageProps.dehydratedState ? JSON.parse(pageProps.dehydratedState) : undefined;

  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={layoutState}>
          <Hydrate state={pageState}>
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
};

MyApp.getInitialProps = async (appContext: AppContext) => {
  const req = appContext.ctx.req;

  if (req) {
    // If req is defined, this code runs server side. Dynamically import packages then only.
    const { default: getHydrationProps } = await import('@packages/utils/hydration');
    const { getVisitorPermissions } = await import('@packages/api/auth');
    return {
      layoutProps: await getHydrationProps(async serverQueryClient => {
        const session = await getSession({ req });
        serverQueryClient.setQueryData(QueryKeys.SESSION, session);
        if (!session) {
          const visitorPermissions = await getVisitorPermissions();
          serverQueryClient.setQueryData(QueryKeys.VISITOR, visitorPermissions);
        }
      }),
    };
  }

  return {};
};

export default MyApp;
