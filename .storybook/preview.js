import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import theme from '@packages/theme';
import store from '@packages/store';
import Fonts from '@packages/components/pages/Fonts';


export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  Story => (
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <Fonts />
        <Story />
      </Provider>
    </ChakraProvider>
  ),
];
