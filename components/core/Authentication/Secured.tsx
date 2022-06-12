import useSession from 'hooks/useSession';
import { Children } from 'utils/types';
import { Permissions } from 'utils/permissions';

export interface SecuredProps {
  permissions: Permissions;
  fallback?: Children;
  children: Children;
}

const Secured: React.FC<SecuredProps> = ({ permissions, children, fallback }) => {
  const session = useSession();

  if (session.hasRequiredPermissions(permissions)) return <>{children}</>;
  if (fallback) return <>{fallback}</>;
  return null;
};

export default Secured;
