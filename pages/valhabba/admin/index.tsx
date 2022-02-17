import React from 'react';
import { ComponentWithAuth, ROUTES_TO_PERMISSIONS } from '@packages/utils/auth';
import Admin from '@packages/components/pages/Admin';
// import Members from '@packages/components/pages/Admin/Members';
import { Routes } from '@packages/utils/routes';

const AdminPage: ComponentWithAuth = () => (
  <Admin>
    <>Page vikings</>
  </Admin>
);

AdminPage.needAuth = { permissions: ROUTES_TO_PERMISSIONS[Routes.ADMIN] };
export default AdminPage;
