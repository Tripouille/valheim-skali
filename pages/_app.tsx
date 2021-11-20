import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from 'store';
import { ChakraProvider } from '@chakra-ui/react';
import Layout from 'components/layout/Layout';
import theme from '../theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </ChakraProvider>
  );
}

export default MyApp;
