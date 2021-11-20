import { extendTheme } from '@chakra-ui/react';

const options = {
  config: {
    initialColorMode: 'dark',
  },
  sizes: {
    header: '4rem',
  },
};

const theme = extendTheme(options);

export default theme;
