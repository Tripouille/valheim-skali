import { useSession } from '@packages/utils/hooks/useSession';
import { Children } from '@packages/utils/types';
import { Permissions } from '@packages/utils/auth';

export interface SecuredProps {
  permissions: Permissions;
  children: Children;
  fallback?: Children;
}

const Secured: React.FC<SecuredProps> = ({ permissions, children, fallback }) => {
  const session = useSession();

  if (session.hasRequiredPermissions(permissions)) return <>{children}</>;
  if (fallback) return <>{fallback}</>;
  return null;
};

export default Secured;
