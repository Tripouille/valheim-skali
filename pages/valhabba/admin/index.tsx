import React from 'react';
import { ComponentWithAuth, ROUTES_TO_PERMISSIONS } from '@packages/utils/auth';
import AdminLayout from '@packages/components/pages/Admin';
import Members from '@packages/components/pages/Admin/Members';
import { MenuRoute } from '@packages/utils/routes';

const AdminPage: ComponentWithAuth = () => (
  <AdminLayout>
    <Members />
  </AdminLayout>
);

AdminPage.needAuth = { permissions: ROUTES_TO_PERMISSIONS[MenuRoute.ADMIN] };
export default AdminPage;
