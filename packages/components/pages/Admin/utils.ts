import theme from '@packages/theme';

export const tableSize = 'sm';
export const cellXPadding = theme.sizes[theme.components.Table.sizes[tableSize].td.px]; // 1rem
export const avatarSize = 60;
export const rowIconSize = 'lg';
export const rowIconWidth = theme.sizes[theme.components.Button.sizes[rowIconSize].minW]; // 3rem

export const getCellWidth = (contentWidth: string) => `calc(${contentWidth} + 2 * ${cellXPadding})`;
