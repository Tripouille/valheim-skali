import { getMessageFromError } from '@packages/utils/error';
import Center from '@packages/components/core/Containers/Center';
import { Alert, AlertIcon, AlertTitle } from '@packages/components/core/Feedback/Alert';

export interface ErrorAlertProps {
  error: unknown;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ error }) => {
  return (
    <Center>
      <Alert status="error" w="max-content">
        <AlertIcon />
        <AlertTitle>{getMessageFromError(error)}</AlertTitle>
      </Alert>
    </Center>
  );
};

export default ErrorAlert;
