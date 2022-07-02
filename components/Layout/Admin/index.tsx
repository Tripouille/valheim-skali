import { useRouter } from 'next/router';
import Secured from 'components/core/Authentication/Secured';
import PageTitle from 'components/core/Typography/PageTitle';
import WikiProposalsTable from 'components/pages/Wiki/WikiProposals/WikiProposalsTable';
import WikiPagesTable from 'components/pages/Wiki/WikiPagesTable';
import UsersTable from 'components/pages/Users/UsersTable';
import Roles from 'components/pages/Roles';
import { UserQueryFilter } from 'hooks/users/useUsers';
import { ROUTES_TO_PERMISSIONS } from 'utils/permissions';
import {
  AdminNavRoute,
  getRouteParameterAsString,
  isAdminNavRoute,
  ROUTES_TO_LABEL,
} from 'utils/routes';
import { Children } from 'utils/types';
import AdminLayout from './AdminLayout';

const Admin = () => {
  const router = useRouter();
  const urlEndPoint = '/' + (getRouteParameterAsString(router.query.route) ?? '');

  const route = isAdminNavRoute(urlEndPoint) ? urlEndPoint : AdminNavRoute.MEMBERS;

  const routeToComponent: Record<AdminNavRoute, Children> = {
    [AdminNavRoute.MEMBERS]: <UsersTable filter={UserQueryFilter.MEMBER} />,
    [AdminNavRoute.NON_MEMBERS]: <UsersTable filter={UserQueryFilter.NON_MEMBER} />,
    [AdminNavRoute.ROLES]: <Roles />,
    [AdminNavRoute.WIKI_PROPOSALS]: <WikiProposalsTable />,
    [AdminNavRoute.WIKI]: <WikiPagesTable />,
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
