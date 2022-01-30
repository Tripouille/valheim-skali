import React from 'react';
import * as nextImage from 'next/image';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import theme from '@packages/theme';
import store from '@packages/store';
import Fonts from '@packages/components/Layout/Fonts';

Object.defineProperty(nextImage, 'default', {
  configurable: true,
  value: props => (
    <img
      {...Object.keys(props)
        .filter(
          prop =>
            ![
              'layout',
              'objectFit',
              'objectPosition',
              'quality',
              'placeholder',
              'blurDataURL',
              'loader',
            ].includes(prop),
        )
        .reduce((obj, key) => ({ ...obj, [key]: props[key] }), {})}
      style={{
        maxHeight: '100%',
        maxWidth: '100%',
        objectFit: props.objectFit,
        objectPosition: props.objectPosition,
      }}
    />
  ),
});

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      date: /Date$/,
    },
  },
  nextRouter: {
    Provider: RouterContext.Provider,
  },
};

export const decorators = [
  Story => (
    <ChakraProvider theme={theme} colorModeManager>
      <Provider store={store}>
        <Fonts />
        <Story />
      </Provider>
    </ChakraProvider>
  ),
];
