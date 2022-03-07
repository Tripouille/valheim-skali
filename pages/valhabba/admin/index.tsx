import React from 'react';
import { ComponentWithAuth, ROUTES_TO_PERMISSIONS } from '@packages/utils/auth';
import AdminLayout from '@packages/components/pages/Admin';
import Users from '@packages/components/pages/Admin/Users';
import { MenuRoute } from '@packages/utils/routes';
import { UserQueryFilter } from '@packages/components/pages/Admin/utils';

const AdminPage: ComponentWithAuth = () => (
  <AdminLayout>
    <Users filter={UserQueryFilter.MEMBER} />
  </AdminLayout>
);

AdminPage.needAuth = { permissions: ROUTES_TO_PERMISSIONS[MenuRoute.ADMIN] };
export default AdminPage;
