import { LayoutProps, TypographyProps } from '@chakra-ui/react';

interface LimitedWidthVariantProps {
  overflow: LayoutProps['overflow'];
  whiteSpace: TypographyProps['whiteSpace'];
  textOverflow: TypographyProps['textOverflow'];
}
export const limitedWidthVariant: LimitedWidthVariantProps = {
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
};

export const LimitedWidthText = {
  variants: {
    limitedWidth: limitedWidthVariant,
  },
};
