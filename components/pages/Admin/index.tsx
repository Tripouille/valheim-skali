import { useRouter } from 'next/router';
import { UseQueryResult } from 'react-query';
import { User } from 'data/user';
import { Role } from 'data/role';
import {
  AdminNavRoute,
  getRouteParameterAsString,
  isAdminNavRoute,
  ROUTES_TO_LABEL,
} from 'utils/routes';
import { ROUTES_TO_PERMISSIONS } from 'utils/auth';
import { Children } from 'utils/types';
import Secured from 'components/core/Authentication/Secured';
import PageTitle from 'components/core/Typography/PageTitle';
import QueryHandler from 'components/core/Disclosure/QueryHandler';
import { UserQueryFilter } from './utils';
import { useUsers } from './hooks/useUsers';
import { useRoles } from './hooks/useRoles';
import AdminLayout from './AdminLayout';
import UsersTable from './Users/UsersTable';
import Roles from './Roles';

const Admin = () => {
  const membersQuery = useUsers(UserQueryFilter.MEMBER);
  const nonMembersQuery = useUsers(UserQueryFilter.NON_MEMBER);
  const rolesQuery = useRoles();

  const router = useRouter();
  const urlEndPoint = '/' + getRouteParameterAsString(router.query.route);

  const route = isAdminNavRoute(urlEndPoint) ? urlEndPoint : AdminNavRoute.MEMBERS;

  const routeToQuery: Record<AdminNavRoute, UseQueryResult<User[] | Role[]>> = {
    [AdminNavRoute.MEMBERS]: membersQuery,
    [AdminNavRoute.NON_MEMBERS]: nonMembersQuery,
    [AdminNavRoute.ROLES]: rolesQuery,
  };

  const routeToComponent: Record<AdminNavRoute, Children> = {
    [AdminNavRoute.MEMBERS]: (
      <UsersTable users={membersQuery.data} filter={UserQueryFilter.MEMBER} />
    ),
    [AdminNavRoute.NON_MEMBERS]: (
      <UsersTable users={nonMembersQuery.data} filter={UserQueryFilter.NON_MEMBER} />
    ),
    [AdminNavRoute.ROLES]: <Roles roles={rolesQuery.data} />,
  };

  return (
    <AdminLayout>
      <Secured permissions={ROUTES_TO_PERMISSIONS[route]}>
        <PageTitle title={ROUTES_TO_LABEL[route]} size="xl" mb="4" />
        <QueryHandler query={routeToQuery[route]}>{routeToComponent[route]}</QueryHandler>
      </Secured>
    </AdminLayout>
  );
};

export default Admin;
