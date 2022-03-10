import React from 'react';
import { MenuRoute } from '@packages/utils/routes';
import { ComponentWithAuth, ROUTES_TO_PERMISSIONS } from '@packages/utils/auth';
import Admin from '@packages/components/pages/Admin';

const AdminPage: ComponentWithAuth = () => <Admin />;

AdminPage.needAuth = { permissions: ROUTES_TO_PERMISSIONS[MenuRoute.ADMIN] };
export default AdminPage;
