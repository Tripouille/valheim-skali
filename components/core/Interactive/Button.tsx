import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
  forwardRef,
} from '@chakra-ui/react';

export type ButtonProps = ChakraButtonProps;

const Button = forwardRef<ButtonProps, 'button'>((chakraButtonProps, ref) => (
  <ChakraButton {...chakraButtonProps} ref={ref} />
));

Button.displayName = 'Button';
export default Button;
