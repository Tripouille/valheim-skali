import { extendTheme } from '@chakra-ui/react';
import { Card } from './components/Card';

const options = {
  styles: {
    global: {
      'html, body': {
        lineHeight: 'tall',
      },
      '&::-webkit-scrollbar': {
        width: '0.8rem',
        height: '0.8rem',
      },
      '&::-webkit-scrollbar-track': {
        backgroundColor: 'blue.900',
        borderRadius: 'sm',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'blue.500',
        borderRadius: 'sm',
      },
      '&::-webkit-scrollbar-thumb:hover': {
        backgroundColor: 'blue.300',
      },
      '&::-webkit-scrollbar-corner': {
        backgroundColor: 'blue.900',
      },
    },
  },
  components: {
    Card,
  },
  config: {
    initialColorMode: 'dark',
  },
  sizes: {
    header: '4rem',
  },
  fonts: {
    body: 'Lucida Sans',
    heading: 'Lucida Sans',
  },
};

const theme = extendTheme(options);

export default theme;
