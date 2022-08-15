import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useSession from 'hooks/useSession';
import { Children } from 'utils/types';
import { Permissions } from 'utils/permissions';
import { getSigninRoute } from 'utils/routes';
import { AuthError, SessionStatus } from 'utils/auth';

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

  useEffect(
    function () {
      if (redirectOnFail && !hasRequiredPermissions && session.status !== SessionStatus.LOADING)
        router.push(getSigninRoute(AuthError.NOT_ENOUGH_PERMISSIONS));
    },
    [hasRequiredPermissions, redirectOnFail, router, session.status],
  );

  if (hasRequiredPermissions) return <>{children}</>;
  if (fallback) return <>{fallback}</>;
  return null;
};

export default Secured;
