import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux';
import store from 'store';
import { ChakraProvider } from '@chakra-ui/react';
import Layout from 'components/layout/Layout';
import theme from '../theme';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <Provider store={store}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </ChakraProvider>
    </SessionProvider>
  );
}

export default MyApp;
