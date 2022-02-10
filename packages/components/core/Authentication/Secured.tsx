import { useSession } from 'next-auth/react';
import { Children } from '@packages/utils/types';
import Spinner from '@packages/components/core/Feedback/Spinner';
import Center from '@packages/components/core/Containers/Center';

enum SessionStatus {
  LOADING = 'loading',
  AUTHENTICATED = 'authenticated',
  UNAUTHENTICATED = 'unauthenticated',
}

export interface SecuredProps {
  children: Children;
}

const Secured: React.FC<SecuredProps> = ({ children }) => {
  const session = useSession({ required: true });

  if (session.status === SessionStatus.AUTHENTICATED) {
    return children;
  }

  return (
    <Center>
      <Spinner />
    </Center>
  );
};

export default Secured;
