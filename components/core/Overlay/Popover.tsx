import React from 'react';
import {
  Popover as ChakraPopover,
  PopoverProps as ChakraPopoverProps,
  PopoverTrigger as ChakraPopoverTrigger,
  PopoverContent as ChakraPopoverContent,
  PopoverContentProps as ChakraPopoverContentProps,
  PopoverHeader as ChakraPopoverHeader,
  PopoverHeaderProps as ChakraPopoverHeaderProps,
  PopoverBody as ChakraPopoverBody,
  PopoverBodyProps as ChakraPopoverBodyProps,
  PopoverFooter as ChakraPopoverFooter,
  PopoverFooterProps as ChakraPopoverFooterProps,
  PopoverArrow as ChakraPopoverArrow,
  PopoverArrowProps as ChakraPopoverArrowProps,
  PopoverCloseButton as ChakraPopoverCloseButton,
  PopoverCloseButtonProps as ChakraPopoverCloseButtonProps,
  PopoverAnchor as ChakraPopoverAnchor,
} from '@chakra-ui/react';

export type PopoverProps = ChakraPopoverProps;

export const Popover: React.FC<PopoverProps> = chakraPopoverProps => (
  <ChakraPopover {...chakraPopoverProps}></ChakraPopover>
);

export const PopoverTrigger: React.FC = chakraPopoverTriggerProps => (
  <ChakraPopoverTrigger {...chakraPopoverTriggerProps}></ChakraPopoverTrigger>
);

export type PopoverContentProps = ChakraPopoverContentProps;

export const PopoverContent: React.FC<PopoverContentProps> = chakraPopoverContentProps => (
  <ChakraPopoverContent {...chakraPopoverContentProps}></ChakraPopoverContent>
);

export type PopoverHeaderProps = ChakraPopoverHeaderProps;

export const PopoverHeader: React.FC<PopoverHeaderProps> = chakraPopoverHeaderProps => (
  <ChakraPopoverHeader {...chakraPopoverHeaderProps}></ChakraPopoverHeader>
);

export type PopoverBodyProps = ChakraPopoverBodyProps;

export const PopoverBody: React.FC<PopoverBodyProps> = chakraPopoverBodyProps => (
  <ChakraPopoverBody {...chakraPopoverBodyProps}></ChakraPopoverBody>
);

export type PopoverFooterProps = ChakraPopoverFooterProps;

export const PopoverFooter: React.FC<PopoverFooterProps> = chakraPopoverFooterProps => (
  <ChakraPopoverFooter {...chakraPopoverFooterProps}></ChakraPopoverFooter>
);

export type PopoverArrowProps = ChakraPopoverArrowProps;

export const PopoverArrow: React.FC<PopoverArrowProps> = chakraPopoverArrowProps => (
  <ChakraPopoverArrow {...chakraPopoverArrowProps}></ChakraPopoverArrow>
);

export type PopoverCloseButtonProps = ChakraPopoverCloseButtonProps;

export const PopoverCloseButton: React.FC<
  PopoverCloseButtonProps
> = chakraPopoverCloseButtonProps => (
  <ChakraPopoverCloseButton {...chakraPopoverCloseButtonProps}></ChakraPopoverCloseButton>
);

export const PopoverAnchor: React.FC = chakraPopoverAnchorProps => (
  <ChakraPopoverAnchor {...chakraPopoverAnchorProps}></ChakraPopoverAnchor>
);
