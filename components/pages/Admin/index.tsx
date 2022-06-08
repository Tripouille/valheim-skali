import { useRouter } from 'next/router';
import {
  AdminNavRoute,
  getRouteParameterAsString,
  isAdminNavRoute,
  ROUTES_TO_LABEL,
} from 'utils/routes';
import { ROUTES_TO_PERMISSIONS } from 'utils/permissions';
import { Children } from 'utils/types';
import Secured from 'components/core/Authentication/Secured';
import PageTitle from 'components/core/Typography/PageTitle';
import { UserQueryFilter } from './utils';
import AdminLayout from './AdminLayout';
import UsersTable from './Users/UsersTable';
import Roles from './Roles';
import WikiProposalsTable from './WikiProposals/WikiProposalsTable';

const Admin = () => {
  const router = useRouter();
  const urlEndPoint = '/' + getRouteParameterAsString(router.query.route);

  const route = isAdminNavRoute(urlEndPoint) ? urlEndPoint : AdminNavRoute.MEMBERS;

  const routeToComponent: Record<AdminNavRoute, Children> = {
    [AdminNavRoute.MEMBERS]: <UsersTable filter={UserQueryFilter.MEMBER} />,
    [AdminNavRoute.NON_MEMBERS]: <UsersTable filter={UserQueryFilter.NON_MEMBER} />,
    [AdminNavRoute.ROLES]: <Roles />,
    [AdminNavRoute.WIKI]: <WikiProposalsTable />,
  };

  return (
    <AdminLayout>
      <Secured permissions={ROUTES_TO_PERMISSIONS[route]}>
        <PageTitle title={ROUTES_TO_LABEL[route]} size="xl" mb="4" />
        {routeToComponent[route]}
      </Secured>
    </AdminLayout>
  );
};

export default Admin;
