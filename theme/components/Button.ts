import { theme as baseTheme } from '@chakra-ui/react';

export const Button = {
  variants: {
    expand: {
      height: baseTheme.fontSizes.xl,
      minHeight: 'full',
      fontSize: 'lg',
      _focus: {
        boxShadow: 'none',
      },
      _hover: {
        fontSize: 'xl',
      },
      svg: {
        display: 'inline-block',
      },
    },
  },
};
