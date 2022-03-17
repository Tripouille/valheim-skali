import { createStandaloneToast, UseToastOptions } from '@chakra-ui/react';
import Toast from '@packages/components/core/Feedback/Toast';
import theme from '@packages/theme';

const toast = createStandaloneToast({ theme });

const commonToastOptions: UseToastOptions = {
  duration: 3000,
  position: 'bottom-right',
};

export const displayErrorToast = (options: UseToastOptions) => {
  toast({
    ...commonToastOptions,
    containerStyle: { color: 'darkred' },
    render: ({ id, onClose }) => (
      <Toast
        id={id}
        onClose={onClose}
        status="error"
        title={options.title}
        description={options.description}
      />
    ),
  });
};

export const displaySuccessToast = (options: UseToastOptions) => {
  toast({
    ...commonToastOptions,
    containerStyle: { color: 'darkgreen' },
    render: ({ id, onClose }) => (
      <Toast
        id={id}
        onClose={onClose}
        status="success"
        title={options.title}
        description={options.description}
      />
    ),
  });
};
