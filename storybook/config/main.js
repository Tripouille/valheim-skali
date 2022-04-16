const path = require('path');

module.exports = {
  stories: ['../**/*.stories.tsx'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@chakra-ui/storybook-addon',
    'storybook-addon-next-router',
  ],
  framework: '@storybook/react',
  staticDirs: ['../../public'],
  webpackFinal: config => {
    config.resolve.modules = [...config.resolve.modules, path.resolve('./')];
    return config;
  },
};
