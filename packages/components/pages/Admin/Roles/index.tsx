import { AdminNavRoute, ROUTES_TO_LABEL } from '@packages/utils/routes';
import { ROUTES_TO_PERMISSIONS } from '@packages/utils/auth';
import Secured from '@packages/components/core/Authentication/Secured';
import Loading from '@packages/components/core/Feedback/Loading';
import ErrorAlert from '@packages/components/core/Feedback/ErrorAlert';
import PageTitle from '@packages/components/core/Typography/PageTitle';
import { useRoles } from '../hooks/useRoles';
import RolesTable from './RolesTable';

const Roles = () => {
  const rolesQuery = useRoles();

  const getContentFromStatus = () => {
    switch (rolesQuery.status) {
      case 'loading':
        return <Loading />;
      case 'success':
        return <RolesTable roles={rolesQuery.data} />;
      case 'error':
        return <ErrorAlert error={rolesQuery.error} />;
    }
  };

  return (
    <Secured permissions={ROUTES_TO_PERMISSIONS[AdminNavRoute.ROLES]}>
      <PageTitle title={ROUTES_TO_LABEL[AdminNavRoute.ROLES]} size="xl" mb="4" />
      {getContentFromStatus()}
    </Secured>
  );
};

export default Roles;
