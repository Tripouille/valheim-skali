import { useRouter } from 'next/router';
import Secured from 'components/core/Authentication/Secured';
import PageTitle from 'components/core/Typography/PageTitle';
import Roles from 'components/pages/Roles';
import UsersTable from 'components/pages/Users/UsersTable';
import WikiPagesTable from 'components/pages/Wiki/WikiPagesTable';
import WikiProposalsTable from 'components/pages/Wiki/WikiProposals/WikiProposalsTable';
import { UserQueryFilter } from 'hooks/users/useUsers';
import useSession from 'hooks/useSession';
import {
  ROUTES_TO_PERMISSIONS,
  PermissionCategory,
  userPrivilege,
  wikiPrivilege,
} from 'utils/permissions';
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
  const urlEndPoint = getRouteParameterAsString(router.query.route) ?? '';

  const session = useSession();
  const hasUserReadPermission = session.hasRequiredPermissions({
    [PermissionCategory.USER]: userPrivilege.READ,
  });
  const hasWikiWritePermission = session.hasRequiredPermissions({
    [PermissionCategory.WIKI]: wikiPrivilege.WRITE,
  });

  let route: AdminNavRoute;
  if (isAdminNavRoute(urlEndPoint)) route = urlEndPoint;
  else {
    if (hasUserReadPermission) route = AdminNavRoute.MEMBERS;
    else if (hasWikiWritePermission) route = AdminNavRoute.WIKI_PROPOSALS;
    else route = AdminNavRoute.ROLES;
  }

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
