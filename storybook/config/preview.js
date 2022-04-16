import React from 'react';
import * as nextImage from 'next/image';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { QueryClient, QueryClientProvider } from 'react-query';
import { rest } from 'msw';
import { initialize as initializeMsw, mswDecorator } from 'msw-storybook-addon';
import theme from 'theme';
import { APIRoute } from 'utils/routes';
import Fonts from 'components/Layout/Fonts';

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
  chakra: { theme },
  controls: {
    matchers: {
      date: /Date$/,
    },
  },
  nextRouter: {
    Provider: RouterContext.Provider,
  },
  msw: {
    handlers: {
      session: rest.get(APIRoute.SESSION, (req, res, ctx) => res(ctx.json({}))),
      visitor: rest.get(APIRoute.VISITOR, (req, res, ctx) => res(ctx.json({}))),
    },
  },
  previewTabs: {
    'storybook/docs/panel': {
      hidden: true,
    },
  },
};

initializeMsw({ onUnhandledRequest: 'bypass' });
const queryClient = new QueryClient();

export const decorators = [
  mswDecorator,
  Story => (
    <QueryClientProvider client={queryClient}>
      <Fonts />
      <Story />
    </QueryClientProvider>
  ),
];
