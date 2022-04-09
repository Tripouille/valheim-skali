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

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ChakraProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
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
    </QueryClientProvider>
  </ChakraProvider>
);

MyApp.getInitialProps = async (appContext: AppContext) => {
  const req = appContext.ctx.req;

  // if (Component.getServerSideProps) {
  //   Object.assign(appProps, await Component.getServerSideProps(ctx));
  // }

  const serverQueryClient = new QueryClient();

  const session = await getSession({ req });
  serverQueryClient.setQueryData(QueryKeys.SESSION, session);

  /** Consider https://github.com/tannerlinsley/react-query/issues/1458#issuecomment-747716357 in case of infinite query */
  return {
    pageProps: {
      dehydratedState: dehydrate(serverQueryClient),
    },
  };
};

export default MyApp;
