import React from 'react';
import {
  Modal as ChakraModal,
  ModalProps as ChakraModalProps,
  ModalOverlay as ChakraModalOverlay,
  ModalOverlayProps as ChakraModalOverlayProps,
  ModalContent as ChakraModalContent,
  ModalContentProps as ChakraModalContentProps,
  ModalCloseButton as ChakraModalCloseButton,
  CloseButtonProps as ChakraModalCloseButtonProps,
  ModalBody as ChakraModalBody,
  ModalBodyProps as ChakraModalBodyProps,
} from '@chakra-ui/react';
import theme from '@packages/theme';

export type ModalProps = ChakraModalProps;

export const Modal: React.FC<ModalProps> = chakraModalProps => (
  <ChakraModal scrollBehavior="inside" isCentered size="6xl" {...chakraModalProps}></ChakraModal>
);

export type ModalOverlayProps = ChakraModalOverlayProps;

export const ModalOverlay: React.FC<ModalOverlayProps> = chakraModalOverlayProps => (
  <ChakraModalOverlay
    bgColor={theme.colors.overlay}
    {...chakraModalOverlayProps}
  ></ChakraModalOverlay>
);

export type ModalContentProps = ChakraModalContentProps;

export const ModalContent: React.FC<ModalContentProps> = chakraModalContentProps => (
  <ChakraModalContent
    bgColor={theme.colors.opaqueBackground}
    border="1px silver solid"
    {...chakraModalContentProps}
  ></ChakraModalContent>
);

export type ModalCloseButtonProps = ChakraModalCloseButtonProps;

export const ModalCloseButton: React.FC<ModalCloseButtonProps> = chakraModalCloseButtonProps => (
  <ChakraModalCloseButton {...chakraModalCloseButtonProps}></ChakraModalCloseButton>
);

export type ModalBodyProps = ChakraModalBodyProps;

export const ModalBody: React.FC<ModalBodyProps> = chakraModalBodyProps => (
  <ChakraModalBody {...chakraModalBodyProps}></ChakraModalBody>
);
