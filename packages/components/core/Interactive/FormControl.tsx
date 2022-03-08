import React from 'react';
import {
  FormLabel as ChakraFormLabel,
  FormLabelProps as ChakraFormLabelProps,
} from '@chakra-ui/react';

export type FormLabelProps = ChakraFormLabelProps;

const FormLabel: React.FC<FormLabelProps> = chakraFormLabelProps => (
  <ChakraFormLabel {...chakraFormLabelProps}></ChakraFormLabel>
);

export default FormLabel;
