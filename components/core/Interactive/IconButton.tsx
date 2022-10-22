import {
  forwardRef,
  IconButton as ChakraIconButton,
  IconButtonProps as ChakraIconButtonProps,
} from '@chakra-ui/react';

export type IconButtonProps = ChakraIconButtonProps;

const IconButton = forwardRef<IconButtonProps, 'button'>((chakraIconButtonProps, ref) => (
  <ChakraIconButton {...chakraIconButtonProps} ref={ref}></ChakraIconButton>
));

IconButton.displayName = 'IconButton';
export default IconButton;
