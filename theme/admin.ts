import theme from 'theme';

export const tableSize = 'sm';
export const cellXPadding = theme.sizes[theme.components.Table.sizes[tableSize].td.px]; // 1rem
export const avatarSize = '60px';
export const rowIconSize = 'lg';
export const rowIconWidth = theme.sizes[theme.components.Button.sizes[rowIconSize].minW]; // 3rem
export const tableStyleProps = {
  variant: 'striped',
  size: tableSize,
  w: { base: '100%', md: '90%', xl: '70%' },
  margin: 'auto',
  sx: { tableLayout: 'fixed' },
};
export const darkerBackgroundColor = 'rgba(0, 0, 0, 0.08)';
export const modalTableHeaderWidth = '20%';

export const getCellWidth = (contentWidth: string) => `calc(${contentWidth} + 2 * ${cellXPadding})`;
