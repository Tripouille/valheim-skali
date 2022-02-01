import { extendTheme } from '@chakra-ui/react';
import { Card } from './components/Card';
import { Button } from './components/Button';

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
    Button,
  },
  config: {
    initialColorMode: 'dark',
  },
  sizes: {
    header: '4rem',
  },
  fonts: {
    body: 'Lucida Sans, sans-serif',
    heading: 'Lucida Sans, sans-serif',
  },
  colors: {
    overlay: 'rgba(49, 130, 206, 0.7)',
    background: 'rgba(44, 82, 130, 0.95)',
    opaqueBackground: 'blue.700',
    backgroundHover: 'rgb(34, 72, 120)',
  },
};

const theme = extendTheme(options);

export default theme;
