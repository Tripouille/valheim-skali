export const Card = {
  // The styles all Cards have in common
  baseStyle: {
    display: 'flex',
    flexDirection: 'column',
    background: 'rgba(45, 55, 72, 0.95)',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  sizes: {
    sm: {
      fontSize: 'sm',
      px: 4, // <-- px is short for paddingLeft and paddingRight
      py: 3, // <-- py is short for paddingTop and paddingBottom
    },
    md: {
      fontSize: 'md',
      px: 6, // <-- these values are tokens from the design system
      py: 4, // <-- these values are tokens from the design system
    },
  },
  // Two variants: rounded and smooth
  variants: {
    rounded: {
      padding: 8,
      borderRadius: 'xl',
      boxShadow: 'xl',
    },
    smooth: {
      padding: 6,
      borderRadius: 'base',
      boxShadow: 'md',
    },
  },
  // The default variant value
  defaultProps: {
    variant: 'smooth',
    size: 'sm',
  },
};

export type CardVariant = keyof typeof Card['variants'];

export type CardSize = keyof typeof Card['sizes'];
