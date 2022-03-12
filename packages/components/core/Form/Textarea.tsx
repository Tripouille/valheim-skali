import React from 'react';
import {
  Textarea as ChakraTextarea,
  TextareaProps as ChakraTextareaProps,
  forwardRef,
} from '@chakra-ui/react';
import { DataAttributes } from '@packages/utils/dataAttributes';

export type TextareaProps = Omit<ChakraTextareaProps, 'onChange'> &
  DataAttributes & {
    onChange?: (newValue: string) => void;
  };

const Textarea = forwardRef<TextareaProps, 'input'>(
  ({ dataCy, onChange, ...chakraTextareaProps }, ref) => {
    const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = e => {
      if (onChange) onChange(e.target.value);
    };

    return (
      <ChakraTextarea {...chakraTextareaProps} data-cy={dataCy} onChange={handleChange} ref={ref} />
    );
  },
);

Textarea.displayName = 'Textarea';
export default Textarea;
