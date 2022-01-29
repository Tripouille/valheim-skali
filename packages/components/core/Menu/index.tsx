import React from 'react';
import {
  forwardRef,
  Menu as ChakraMenu,
  MenuProps as ChakraMenuProps,
  MenuButton as ChakraMenuButton,
  MenuButtonProps as ChakraMenuButtonProps,
  MenuItem as ChakraMenuItem,
  MenuItemProps as ChakraMenuItemProps,
  MenuList as ChakraMenuList,
  MenuListProps as ChakraMenuListProps,
} from '@chakra-ui/react';
import { ElementCategoriesProps } from '@packages/utils/types';

export type MenuProps = ChakraMenuProps;

export const Menu: React.FC<MenuProps> = chakraMenuProps => (
  <ChakraMenu {...chakraMenuProps}></ChakraMenu>
);

export type MenuButtonProps = ChakraMenuButtonProps & ElementCategoriesProps;

export const MenuButton = forwardRef<MenuButtonProps, 'button'>((props, ref) => (
  <ChakraMenuButton {...props} ref={ref} />
));
MenuButton.displayName = 'MenuButton';

export type MenuItemProps = ChakraMenuItemProps;

export const MenuItem: React.FC<MenuItemProps> = chakraMenuItemProps => (
  <ChakraMenuItem {...chakraMenuItemProps}></ChakraMenuItem>
);

export type MenuListProps = ChakraMenuListProps;

export const MenuList: React.FC<MenuListProps> = chakraMenuListProps => (
  <ChakraMenuList {...chakraMenuListProps}></ChakraMenuList>
);
