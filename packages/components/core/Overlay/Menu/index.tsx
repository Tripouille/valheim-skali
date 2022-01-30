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
import { DataAttributes } from '@packages/utils/types';

export type MenuProps = ChakraMenuProps;

export const Menu: React.FC<MenuProps> = chakraMenuProps => (
  <ChakraMenu {...chakraMenuProps}></ChakraMenu>
);

export type MenuButtonProps = ChakraMenuButtonProps & DataAttributes;

export const MenuButton = forwardRef<MenuButtonProps, 'button'>((chakraMenuButtonProps, ref) => (
  <ChakraMenuButton {...chakraMenuButtonProps} ref={ref} />
));
MenuButton.displayName = 'MenuButton';

export type MenuItemProps = ChakraMenuItemProps & DataAttributes;

export const MenuItem: React.FC<MenuItemProps> = ({ dataCy, ...chakraMenuItemProps }) => (
  <ChakraMenuItem {...chakraMenuItemProps} data-cy={dataCy}></ChakraMenuItem>
);

export type MenuListProps = ChakraMenuListProps;

export const MenuList: React.FC<MenuListProps> = chakraMenuListProps => (
  <ChakraMenuList {...chakraMenuListProps}></ChakraMenuList>
);
