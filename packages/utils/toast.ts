import { createStandaloneToast, UseToastOptions } from '@chakra-ui/react';
import theme from '@packages/theme';

const toast = createStandaloneToast({ theme });

const commonToastOptions: UseToastOptions = {
  duration: 3000,
  isClosable: true,
  position: 'bottom-right',
};

export const displayErrorToast = (options: UseToastOptions) => {
  toast({
    ...commonToastOptions,
    status: 'error',
    variant: 'subtle',
    containerStyle: { color: 'darkred' },
    ...options,
  });
};

export const displaySuccessToast = (options: UseToastOptions) => {
  toast({
    ...commonToastOptions,
    status: 'success',
    variant: 'solid',
    containerStyle: { color: 'darkgreen' },
    ...options,
  });
};
