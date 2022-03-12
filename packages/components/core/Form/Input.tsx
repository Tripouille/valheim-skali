import React from 'react';
import { Input as ChakraInput, InputProps as ChakraInputProps, forwardRef } from '@chakra-ui/react';
import { DataAttributes } from '@packages/utils/dataAttributes';

export type InputProps = Omit<ChakraInputProps, 'onChange'> &
  DataAttributes & {
    onChange?: (newValue: string) => void;
    showInvalidOverFocus?: boolean;
  };

const Input = forwardRef<InputProps, 'input'>(
  ({ dataCy, onChange, showInvalidOverFocus, ...chakraInputProps }, ref) => {
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
        data-cy={dataCy}
        onChange={handleChange}
        ref={ref}
      />
    );
  },
);

Input.displayName = 'Input';
export default Input;
