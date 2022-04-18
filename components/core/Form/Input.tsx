import React from 'react';
import { Input as ChakraInput, InputProps as ChakraInputProps, forwardRef } from '@chakra-ui/react';

export type InputProps = Omit<ChakraInputProps, 'onChange'> & {
  onChange?: (newValue: string) => void;
  showInvalidOverFocus?: boolean;
};

const Input = forwardRef<InputProps, 'input'>(
  ({ onChange, showInvalidOverFocus, ...chakraInputProps }, ref) => {
    const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
      if (onChange) onChange(e.target.value);
    };

    return (
      <ChakraInput
        _invalid={
          showInvalidOverFocus
            ? {
                borderColor: 'salmon !important',
                boxShadow: 'none !important',
              }
            : undefined
        }
        {...chakraInputProps}
        onChange={handleChange}
        ref={ref}
      />
    );
  },
);

Input.displayName = 'Input';
export default Input;
