import { extendTheme } from '@chakra-ui/react';
import { Card } from './components/Card';

const options = {
  components: {
    Card,
  },
  config: {
    initialColorMode: 'dark',
  },
  sizes: {
    header: '4rem',
  },
};

const theme = extendTheme(options);

export default theme;
