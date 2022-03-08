import { useRouter } from 'next/router';
import useSession from '@packages/utils/hooks/useSession';
import { Children } from '@packages/utils/types';
import {
  AuthError,
  Permissions,
  SessionStatus,
  userHasRequiredPermissions,
} from '@packages/utils/auth';
import { getSigninRoute } from '@packages/utils/routes';
import Loading from '@packages/components/core/Feedback/Loading';

export interface SecuredPageProps {
  permissions: Permissions;
  children: Children;
}

const SecuredPage: React.FC<SecuredPageProps> = ({ permissions, children }) => {
  const router = useRouter();
  const session = useSession({
    required: true,
    redirectTo: getSigninRoute(AuthError.SESSION_REQUIRED, router.asPath),
  });

  if (session.status === SessionStatus.AUTHENTICATED) {
    if (userHasRequiredPermissions(session.data.permissions, permissions)) {
      return <>{children}</>;
    } else {
      router.push('/403');
    }
  }

  return <Loading />;
};

export default SecuredPage;
