import { theme as baseTheme } from '@chakra-ui/react';
import { StyleFunctionProps, mode } from '@chakra-ui/theme-tools';

/** Fix striped variant which acted on non-striped subtables */
export const Table = {
  variants: {
    striped: (props: StyleFunctionProps) => {
      const { colorScheme: c } = props;
      const base = baseTheme.components.Table.variants.striped(props);

      return {
        ...base,
        tbody: {
          tr: {
            '&:nth-of-type(odd)': {
              'th, td': {
                borderBottomWidth: 0,
              },
              td: {
                background: '',
              },
            },
          },
          'td, th': {
            borderBottom: 0,
          },
          '> tr': {
            cursor: 'pointer',
            '> td': {
              borderBottom: '1px',
              borderColor: mode(`${c}.100`, `${c}.700`)(props),
            },
            '&:nth-of-type(odd)': {
              'th, td': {
                borderBottomWidth: '1px',
                borderColor: mode(`${c}.100`, `${c}.700`)(props),
              },
              '> td': {
                background: mode(`${c}.100`, `${c}.700`)(props),
              },
            },
          },
          '> tr:hover': {
            '&:nth-of-type(odd)': {
              '> td': {
                background: '#274d7d',
              },
            },
            '&:nth-of-type(even)': {
              '> td': {
                background: '#284e7e',
              },
            },
          },
        },
      };
    },
  },
};
