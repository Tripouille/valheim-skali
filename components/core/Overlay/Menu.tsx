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
  MenuDivider as ChakraMenuDivider,
  MenuDividerProps as ChakraMenuDividerProps,
} from '@chakra-ui/react';

export type MenuProps = ChakraMenuProps;

export const Menu: React.FC<MenuProps> = chakraMenuProps => (
  <ChakraMenu {...chakraMenuProps}></ChakraMenu>
);

export type MenuButtonProps = ChakraMenuButtonProps;

export const MenuButton = forwardRef<MenuButtonProps, 'button'>((chakraMenuButtonProps, ref) => (
  <ChakraMenuButton {...chakraMenuButtonProps} ref={ref} />
));
MenuButton.displayName = 'MenuButton';

export type MenuItemProps = ChakraMenuItemProps;

export const MenuItem = forwardRef<MenuItemProps, 'button'>((chakraMenuItemProps, ref) => (
  <ChakraMenuItem {...chakraMenuItemProps} ref={ref}></ChakraMenuItem>
));
MenuItem.displayName = 'MenuItem';

export type MenuListProps = ChakraMenuListProps;

export const MenuList: React.FC<MenuListProps> = chakraMenuListProps => (
  <ChakraMenuList {...chakraMenuListProps}></ChakraMenuList>
);

export type MenuDividerProps = ChakraMenuDividerProps;

export const MenuDivider: React.FC<MenuDividerProps> = chakraMenuDividerProps => (
  <ChakraMenuDivider {...chakraMenuDividerProps}></ChakraMenuDivider>
);
