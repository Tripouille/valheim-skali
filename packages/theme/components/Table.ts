import { theme as baseTheme } from '@chakra-ui/react';
import { StyleFunctionProps } from '@chakra-ui/theme-tools';

export const Table = {
  variants: {
    striped: (props: StyleFunctionProps) => {
      const base = baseTheme.components.Table.variants.striped(props);
      return {
        ...base,
        tbody: {
          tr: {
            cursor: 'pointer',
          },
          'tr:hover': {
            '&:nth-of-type(odd), &:nth-of-type(even)': {
              td: {
                backgroundColor: 'rgba(0, 0, 0, 0.15)',
              },
            },
          },
        },
      };
    },
  },
};
