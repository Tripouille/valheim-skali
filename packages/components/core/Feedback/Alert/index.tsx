import React from 'react';
import {
  Alert as ChakraAlert,
  AlertProps as ChakraAlertProps,
  AlertIcon as ChakraAlertIcon,
  AlertIconProps as ChakraAlertIconProps,
  AlertTitle as ChakraAlertTitle,
  AlertTitleProps as ChakraAlertTitleProps,
  AlertDescription as ChakraAlertDescription,
  AlertDescriptionProps as ChakraAlertDescriptionProps,
} from '@chakra-ui/react';

export type AlertProps = ChakraAlertProps;

export const Alert: React.FC<AlertProps> = chakraAlertProps => (
  <ChakraAlert {...chakraAlertProps}></ChakraAlert>
);

export type AlertIconProps = ChakraAlertIconProps;

export const AlertIcon: React.FC<AlertIconProps> = chakraAlertIconProps => (
  <ChakraAlertIcon {...chakraAlertIconProps}></ChakraAlertIcon>
);

export type AlertTitleProps = ChakraAlertTitleProps;

export const AlertTitle: React.FC<AlertTitleProps> = chakraAlertTitleProps => (
  <ChakraAlertTitle {...chakraAlertTitleProps}></ChakraAlertTitle>
);

export type AlertDescriptionProps = ChakraAlertDescriptionProps;

export const AlertDescription: React.FC<AlertDescriptionProps> = chakraAlertDescriptionProps => (
  <ChakraAlertDescription {...chakraAlertDescriptionProps}></ChakraAlertDescription>
);
