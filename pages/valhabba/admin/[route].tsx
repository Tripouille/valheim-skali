import { useRouter } from 'next/router';
import React from 'react';
import { AdminNavRoute, getRouteParameterAsString, MenuRoute } from '@packages/utils/routes';
import { ComponentWithAuth, ROUTES_TO_PERMISSIONS } from '@packages/utils/auth';
import { Children } from '@packages/utils/types';
import AdminLayout from '@packages/components/pages/Admin/AdminLayout';
import Users from '@packages/components/pages/Admin/Users';
import Roles from '@packages/components/pages/Admin/Roles';
import { UserQueryFilter } from '@packages/components/pages/Admin/utils';

const AdminPage: ComponentWithAuth = () => {
  const router = useRouter();

  const route = '/' + getRouteParameterAsString(router.query.route);

  const getAdminComponent = (): Children => {
    switch (route) {
      case AdminNavRoute.MEMBERS:
        return <Users filter={UserQueryFilter.MEMBER} />;
      case AdminNavRoute.NON_MEMBERS:
        return <Users filter={UserQueryFilter.NON_MEMBER} />;
      case AdminNavRoute.ROLES:
        return <Roles />;
      default:
        return <Users />;
    }
  };

  return <AdminLayout>{getAdminComponent()}</AdminLayout>;
};

AdminPage.needAuth = { permissions: ROUTES_TO_PERMISSIONS[MenuRoute.ADMIN] };
export default AdminPage;
