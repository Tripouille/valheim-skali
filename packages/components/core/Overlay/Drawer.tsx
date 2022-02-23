import React from 'react';
import {
  Drawer as ChakraDrawer,
  DrawerProps as ChakraDrawerProps,
  DrawerOverlay as ChakraDrawerOverlay,
  ModalOverlayProps as ChakraDrawerOverlayProps,
  DrawerContent as ChakraDrawerContent,
  DrawerContentProps as ChakraDrawerContentProps,
  DrawerBody as ChakraDrawerBody,
  ModalBodyProps as ChakraDrawerBodyProps,
  DrawerFooter as ChakraDrawerFooter,
  ModalFooterProps as ChakraDrawerFooterProps,
} from '@chakra-ui/react';

export type DrawerProps = ChakraDrawerProps;

export const Drawer: React.FC<DrawerProps> = chakraDrawerProps => (
  <ChakraDrawer {...chakraDrawerProps}></ChakraDrawer>
);

export type DrawerOverlayProps = ChakraDrawerOverlayProps;

export const DrawerOverlay: React.FC<DrawerOverlayProps> = chakraDrawerOverlayProps => (
  <ChakraDrawerOverlay {...chakraDrawerOverlayProps}></ChakraDrawerOverlay>
);

export type DrawerContentProps = ChakraDrawerContentProps;

export const DrawerContent: React.FC<DrawerContentProps> = chakraDrawerContentProps => (
  <ChakraDrawerContent {...chakraDrawerContentProps}></ChakraDrawerContent>
);

export type DrawerBodyProps = ChakraDrawerBodyProps;

export const DrawerBody: React.FC<DrawerBodyProps> = chakraDrawerBodyProps => (
  <ChakraDrawerBody {...chakraDrawerBodyProps}></ChakraDrawerBody>
);

export type DrawerFooterProps = ChakraDrawerFooterProps;

export const DrawerFooter: React.FC<DrawerFooterProps> = chakraDrawerFooterProps => (
  <ChakraDrawerFooter {...chakraDrawerFooterProps}></ChakraDrawerFooter>
);
