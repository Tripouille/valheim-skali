import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useSession from 'hooks/useSession';
import { AuthError, SessionStatus } from 'utils/auth';
import { Permissions } from 'utils/permissions';
import { getSigninRoute } from 'utils/routes';
import { Children } from 'utils/types';

export interface SecuredProps {
  permissions: Permissions | Permissions[];
  fallback?: Children;
  redirectOnFail?: Children;
  children: Children;
}

const Secured: React.FC<SecuredProps> = ({ permissions, children, fallback, redirectOnFail }) => {
  const session = useSession();
  const router = useRouter();

  const hasRequiredPermissions = session.hasRequiredPermissions(permissions);

  useEffect(() => {
    if (redirectOnFail && !hasRequiredPermissions && session.status !== SessionStatus.LOADING)
      router.push(getSigninRoute(AuthError.NOT_ENOUGH_PERMISSIONS));
  }, [hasRequiredPermissions, redirectOnFail, router, session.status]);

  if (hasRequiredPermissions) return <>{children}</>;
  if (fallback) return <>{fallback}</>;
  return null;
};

export default Secured;
