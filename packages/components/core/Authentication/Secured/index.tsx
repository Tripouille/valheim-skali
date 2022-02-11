import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { Children } from '@packages/utils/types';
import { AuthError, Permission } from '@packages/utils/constants';
import { getSigninRoute } from '@packages/utils/routes';
import Spinner from '@packages/components/core/Feedback/Spinner';
import Center from '@packages/components/core/Containers/Center';

enum SessionStatus {
  LOADING = 'loading',
  AUTHENTICATED = 'authenticated',
  UNAUTHENTICATED = 'unauthenticated',
}

export interface SecuredProps {
  permission?: Permission;
  children: Children;
}

const Secured: React.FC<SecuredProps> = ({ permission, children }) => {
  const router = useRouter();
  const session = useSession({
    required: true,
    onUnauthenticated: () => {
      router.push(getSigninRoute(AuthError.SESSION_REQUIRED, router.asPath));
    },
  });

  if (session.status === SessionStatus.AUTHENTICATED) {
    if (permission && !session.data.permissions?.includes(permission)) {
      router.push('/403');
    } else {
      return <>{children}</>;
    }
  }

  return (
    <Center>
      <Spinner />
    </Center>
  );
};

export default Secured;
