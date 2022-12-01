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
  chakra,
} from '@chakra-ui/react';
import { Callback, Children, CypressProps } from 'utils/types';
import Box from '../Containers/Box';
import Button from '../Interactive/Button';
import Portal from './Portal';

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

interface ActionPopoverButtonProps {
  'data-cy': string;
  leftIcon?: ReactElement;
  colorScheme: string;
  children: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export interface ActionPopoverProps extends CypressProps {
  action: Callback;
  label: string;
  confirmLabel?: string;
  confirmBody: string;
  colorScheme: string;
  leftIcon?: ReactElement;
  placement?: PlacementWithLogical;
  inPortal?: boolean;
  children?: (defaultButtonProps: ActionPopoverButtonProps) => Children;
  className?: string;
}

const UnstyledActionPopover: React.FC<ActionPopoverProps> = ({
  'data-cy': dataCy,
  action,
  label,
  confirmLabel = 'Confirmer',
  confirmBody,
  colorScheme,
  leftIcon,
  placement = 'bottom',
  inPortal = false,
  children = defaultButtonProps => <Button {...defaultButtonProps} />,
  className,
}) => {
  const popoverContent = (
    <PopoverContent onClick={e => e.stopPropagation()} cursor="auto">
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
  );
  return (
    <Box className={className}>
      <Popover placement={placement} preventOverflow>
        <PopoverTrigger>
          {children({
            'data-cy': dataCy,
            colorScheme,
            leftIcon,
            children: label,
            onClick: e => e.stopPropagation(),
          })}
        </PopoverTrigger>
        {/* Render in a portal to not inherit css */}
        {inPortal ? <Portal>{popoverContent}</Portal> : popoverContent}
      </Popover>
    </Box>
  );
};

export const ActionPopover = chakra(UnstyledActionPopover);
