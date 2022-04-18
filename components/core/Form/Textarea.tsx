import React from 'react';
import {
  Textarea as ChakraTextarea,
  TextareaProps as ChakraTextareaProps,
  forwardRef,
} from '@chakra-ui/react';

export type TextareaProps = Omit<ChakraTextareaProps, 'onChange'> & {
  onChange?: (newValue: string) => void;
};

const Textarea = forwardRef<TextareaProps, 'input'>(({ onChange, ...chakraTextareaProps }, ref) => {
  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = e => {
    if (onChange) onChange(e.target.value);
  };

  return <ChakraTextarea {...chakraTextareaProps} onChange={handleChange} ref={ref} />;
});

Textarea.displayName = 'Textarea';
export default Textarea;
