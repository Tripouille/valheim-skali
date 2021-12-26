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
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'blue.500',
        borderRadius: 'md',
      },
      '&::-webkit-scrollbar-thumb:hover': {
        backgroundColor: 'blue.300',
      },
      '&::-webkit-scrollbar-corner': {
        backgroundColor: 'blue.900',
      },
      '&::-webkit-scrollbar-button:single-button': {
        backgroundColor: 'blue.900',
        display: 'block',
        height: '0.6rem',
        width: '0.6rem',
        borderStyle: 'solid',
        borderRadius: 'sm',
        borderColor: 'transparent',
      },
      /* Up */
      '&::-webkit-scrollbar-button:single-button:vertical:decrement': {
        borderWidth: '0 0.4rem 0.8rem 0.4rem',
        borderBottomColor: 'blue.500',
      },

      '&::-webkit-scrollbar-button:single-button:vertical:decrement:hover': {
        borderBottomColor: 'blue.300',
      },
      /* Down */
      '&::-webkit-scrollbar-button:single-button:vertical:increment': {
        borderWidth: '0.8rem 0.4rem 0 0.4rem',
        borderTopColor: 'blue.500',
      },

      '&::-webkit-scrollbar-button:vertical:single-button:increment:hover': {
        borderTopColor: 'blue.300',
      },
      /* Left */
      '&::-webkit-scrollbar-button:single-button:horizontal:decrement': {
        borderWidth: '0.4rem 0.8rem 0.4rem 0',
        borderRightColor: 'blue.500',
      },

      '&::-webkit-scrollbar-button:single-button:horizontal:decrement:hover': {
        borderRightColor: 'blue.300',
      },
      /* Right */
      '&::-webkit-scrollbar-button:single-button:horizontal:increment': {
        borderWidth: '0.4rem 0 0.4rem 0.8rem',
        borderLeftColor: 'blue.500',
      },

      '&::-webkit-scrollbar-button:single-button:horizontal:increment:hover': {
        borderLeftColor: 'blue.300',
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
