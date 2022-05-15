import { AdminNavRoute, MenuRoute, serverName } from 'utils/routes';

export const visitAdminPage = (subRoute: AdminNavRoute) => {
  cy.visit(`/${serverName}${MenuRoute.ADMIN}${subRoute}`);
};
