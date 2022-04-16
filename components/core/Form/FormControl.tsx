import React from 'react';
import {
  FormControl as ChakraFormControl,
  FormControlProps as ChakraFormControlProps,
  FormLabel as ChakraFormLabel,
  FormLabelProps as ChakraFormLabelProps,
  FormHelperText as ChakraFormHelperText,
  HelpTextProps as ChakraFormHelperTextProps,
} from '@chakra-ui/react';

export type FormControlProps = ChakraFormControlProps;

export const FormControl: React.FC<FormControlProps> = chakraFormControlProps => (
  <ChakraFormControl {...chakraFormControlProps}></ChakraFormControl>
);

export type FormLabelProps = ChakraFormLabelProps;

// TODO: remove m="0" once the remaining standalone FormLabel have been removed
export const FormLabel: React.FC<FormLabelProps> = chakraFormLabelProps => (
  <ChakraFormLabel m="0" {...chakraFormLabelProps}></ChakraFormLabel>
);

export type FormHelperTextProps = ChakraFormHelperTextProps;

export const FormHelperText: React.FC<FormHelperTextProps> = chakraFormHelperTextProps => (
  <ChakraFormHelperText {...chakraFormHelperTextProps}></ChakraFormHelperText>
);
