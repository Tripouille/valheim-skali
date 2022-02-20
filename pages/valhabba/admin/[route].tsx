import { useRouter } from 'next/router';
import React from 'react';
import { AdminNavRoute, getRouteParameterAsString, MenuRoute } from '@packages/utils/routes';
import { ComponentWithAuth, ROUTES_TO_PERMISSIONS } from '@packages/utils/auth';
import AdminLayout from '@packages/components/pages/Admin';
// import Members from '@packages/components/pages/Admin/Members';
import Users from '@packages/components/pages/Admin/Users';
import Roles from '@packages/components/pages/Admin/Roles';

const AdminPage: ComponentWithAuth = () => {
  const router = useRouter();

  const route = '/' + getRouteParameterAsString(router.query.route);
  if (!Object.values(AdminNavRoute).includes(route as AdminNavRoute)) {
    return <AdminLayout>Erreur : la route demandée n&apos;existe pas.</AdminLayout>;
  }

  const getAdminComponent = () => {
    switch (route) {
      case AdminNavRoute.MEMBERS:
        return <>Page vikings</>;
      case AdminNavRoute.USERS:
        return <Users />;
      case AdminNavRoute.ROLES:
        return <Roles />;
    }
  };

  return <AdminLayout>{getAdminComponent()}</AdminLayout>;
};

AdminPage.needAuth = { permissions: ROUTES_TO_PERMISSIONS[MenuRoute.ADMIN] };
export default AdminPage;
