import { AdminNavRoute } from '@packages/utils/routes';
import { useRoles } from '../hooks/useRoles';
import RolesTable from './RolesTable';
import AdminTableWrapper from '../AdminTableWrapper';

const Roles = () => {
  const rolesQuery = useRoles();

  return (
    <AdminTableWrapper adminNavRoute={AdminNavRoute.ROLES} query={rolesQuery}>
      <RolesTable roles={rolesQuery.data ?? []} />
    </AdminTableWrapper>
  );
};

export default Roles;
