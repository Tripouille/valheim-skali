import { AppContext, AppProps } from 'next/app';
import Head from 'next/head';
import { getSession } from 'next-auth/react';
import React from 'react';
import { QueryClientProvider, Hydrate } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ChakraProvider } from '@chakra-ui/react';
import Layout from 'components/Layout';
import Fonts from 'components/Layout/Fonts';
import theme from 'theme';
import { queryClient, QueryKeys } from 'utils/queryClient';
import { HydrationProps } from 'utils/types';

/** Page props are those of getStaticProps (if defined in page),
 * layout props are returned by MyApp.getInitialProps */
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
              <meta
                name="description"
                content="Skali est le site web du Valhabba, un serveur Valheim français."
              />
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
    const { default: getHydrationProps } = await import('utils/hydration');
    const { getVisitorPermissions } = await import('api-utils/auth');
    return {
      layoutProps: await getHydrationProps(async serverQueryClient => {
        // Avoid warning at build where request has no cookie
        // (because getSession calls an api route and requires header with cookies or no header)
        const session = req.headers.cookie ? await getSession({ req }) : null;
        if (session) {
          serverQueryClient.setQueryData(QueryKeys.SESSION, session);
        } else {
          const visitorPermissions = await getVisitorPermissions();
          serverQueryClient.setQueryData(QueryKeys.VISITOR, visitorPermissions);
        }
      }),
    };
  }

  return {};
};

export default MyApp;
