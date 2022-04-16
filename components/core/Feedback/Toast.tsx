import { CloseButton, RenderProps, UseToastOptions } from '@chakra-ui/react';
import Box from 'components/core/Containers/Box';
import { Alert, AlertDescription, AlertIcon, AlertTitle } from 'components/core/Feedback/Alert';

export interface ToastProps extends RenderProps {
  title: UseToastOptions['title'];
  description: UseToastOptions['description'];
  status: NonNullable<UseToastOptions['status']>;
}

const Toast: React.FC<ToastProps> = ({ id, onClose, title, description, status }) => {
  return (
    <Alert
      id={id.toString()}
      status={status}
      variant="subtle"
      alignItems="start"
      borderRadius="md"
      boxShadow="lg"
      paddingEnd={8}
      textAlign="start"
      width="auto"
    >
      <AlertIcon />
      <Box flex="1" maxWidth="100%">
        {title && <AlertTitle>{title}</AlertTitle>}
        {description && <AlertDescription>{description}</AlertDescription>}
      </Box>
      <CloseButton size="sm" onClick={onClose} position="absolute" insetEnd={1} />
    </Alert>
  );
};

export default Toast;
