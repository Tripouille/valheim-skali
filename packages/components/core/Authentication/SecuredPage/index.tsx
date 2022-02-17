import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { Children } from '@packages/utils/types';
import {
  AuthError,
  Permissions,
  SessionStatus,
  userHasRequiredPermissions,
} from '@packages/utils/auth';
import { getSigninRoute } from '@packages/utils/routes';
import Spinner from '@packages/components/core/Feedback/Spinner';
import Center from '@packages/components/core/Containers/Center';

export interface SecuredPageProps {
  permissions?: Permissions;
  children: Children;
}

const SecuredPage: React.FC<SecuredPageProps> = ({ permissions, children }) => {
  const router = useRouter();
  const session = useSession({
    required: true,
    onUnauthenticated: () => {
      router.push(getSigninRoute(AuthError.SESSION_REQUIRED, router.asPath));
    },
  });

  if (session.status === SessionStatus.AUTHENTICATED) {
    if (userHasRequiredPermissions(session.data.permissions, permissions)) {
      return <>{children}</>;
    } else {
      router.push('/403');
    }
  }

  return (
    <Center>
      <Spinner />
    </Center>
  );
};

export default SecuredPage;
