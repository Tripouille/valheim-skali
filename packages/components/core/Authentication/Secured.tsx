import { useSession } from '@packages/utils/hooks/useSession';
import { Children } from '@packages/utils/types';
import { Permissions, SessionStatus, userHasRequiredPermissions } from '@packages/utils/auth';

export interface SecuredProps {
  permissions: Permissions;
  children: Children;
}

const Secured: React.FC<SecuredProps> = ({ permissions, children }) => {
  const session = useSession();

  if (
    session.status === SessionStatus.AUTHENTICATED &&
    userHasRequiredPermissions(session.data.permissions, permissions)
  ) {
    return <>{children}</>;
  }

  return null;
};

export default Secured;
