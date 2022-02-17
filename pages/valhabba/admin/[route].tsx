import { useRouter } from 'next/router';
import React from 'react';
import { AdminNavRoutes, Routes } from '@packages/utils/routes';
import { ComponentWithAuth, ROUTES_TO_PERMISSIONS } from '@packages/utils/auth';
import Admin from '@packages/components/pages/Admin';
// import Members from '@packages/components/pages/Admin/Members';
import Users from '@packages/components/pages/Admin/Users';
import Roles from '@packages/components/pages/Admin/Roles';

const AdminPage: ComponentWithAuth = () => {
  const router = useRouter();

  const route =
    '/' + (Array.isArray(router.query.route) ? router.query.route.join('') : router.query.route);
  if (!Object.values(AdminNavRoutes).includes(route as AdminNavRoutes)) {
    return <Admin>Erreur : la route demandée n&apos;existe pas.</Admin>;
  }

  return (
    <Admin>
      {route === AdminNavRoutes.MEMBERS && <>Page vikings</>}
      {route === AdminNavRoutes.USERS && <Users />}
      {route === AdminNavRoutes.ROLES && <Roles />}
    </Admin>
  );
};

AdminPage.needAuth = { permissions: ROUTES_TO_PERMISSIONS[Routes.ADMIN] };
export default AdminPage;
