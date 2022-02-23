import { useRouter } from 'next/router';
import React from 'react';
import { AdminNavRoute, getRouteParameterAsString, MenuRoute } from '@packages/utils/routes';
import { ComponentWithAuth, ROUTES_TO_PERMISSIONS } from '@packages/utils/auth';
import { Children } from '@packages/utils/types';
import AdminLayout from '@packages/components/pages/Admin';
import Members from '@packages/components/pages/Admin/Members';
import Users from '@packages/components/pages/Admin/Users';
import Roles from '@packages/components/pages/Admin/Roles';

const AdminPage: ComponentWithAuth = () => {
  const router = useRouter();

  const route = '/' + getRouteParameterAsString(router.query.route);

  const getAdminComponent = (): Children => {
    switch (route) {
      case AdminNavRoute.MEMBERS:
        return <Members />;
      case AdminNavRoute.USERS:
        return <Users />;
      case AdminNavRoute.ROLES:
        return <Roles />;
      default:
        return <Members />;
    }
  };

  return <AdminLayout>{getAdminComponent()}</AdminLayout>;
};

AdminPage.needAuth = { permissions: ROUTES_TO_PERMISSIONS[MenuRoute.ADMIN] };
export default AdminPage;
