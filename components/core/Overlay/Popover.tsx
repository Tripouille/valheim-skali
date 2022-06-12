import React, { ReactElement } from 'react';
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
  PlacementWithLogical,
} from '@chakra-ui/react';
import Button from '../Interactive/Button';
import { Callback, CypressProps } from 'utils/types';
import Box from '../Containers/Box';

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

export interface ActionPopoverProps extends CypressProps {
  action: Callback;
  label: string;
  confirmLabel?: string;
  confirmBody: string;
  colorScheme: string;
  leftIcon?: ReactElement;
  placement?: PlacementWithLogical;
}

export const ActionPopover: React.FC<ActionPopoverProps> = ({
  'data-cy': dataCy,
  action,
  label,
  confirmLabel = 'Confirmer',
  confirmBody,
  colorScheme,
  leftIcon,
  placement = 'bottom',
}) => {
  return (
    <Box>
      <Popover placement={placement} preventOverflow>
        <PopoverTrigger>
          <Button data-cy={dataCy} colorScheme={colorScheme} leftIcon={leftIcon}>
            {label}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>{label}</PopoverHeader>
          <PopoverBody>{confirmBody}</PopoverBody>
          <PopoverFooter textAlign="end">
            <Button data-cy={`confirm-${dataCy}`} colorScheme={colorScheme} onClick={action}>
              {confirmLabel}
            </Button>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </Box>
  );
};
