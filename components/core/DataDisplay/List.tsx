import React from 'react';
import {
  PropsOf,
  List as ChakraList,
  ListProps as ChakraListProps,
  ListItem as ChakraListItem,
  ListItemProps as ChakraListItemProps,
  ListIcon as ChakraListIcon,
  UnorderedList as ChakraUnorderedList,
} from '@chakra-ui/react';

export type ListProps = ChakraListProps;

export const List: React.FC<ListProps> = chakraListProps => (
  <ChakraList {...chakraListProps}></ChakraList>
);

export type ListItemProps = ChakraListItemProps;

export const ListItem: React.FC<ListItemProps> = chakraListItemProps => (
  <ChakraListItem {...chakraListItemProps}></ChakraListItem>
);

export type ListIconProps = PropsOf<typeof ChakraListIcon>;

export const ListIcon: React.FC<ListIconProps> = chakraListIconProps => (
  <ChakraListIcon {...chakraListIconProps}></ChakraListIcon>
);

export type UnorderedListProps = ChakraListProps;

export const UnorderedList: React.FC<UnorderedListProps> = chakraUnorderedListProps => (
  <ChakraUnorderedList {...chakraUnorderedListProps}></ChakraUnorderedList>
);
