import { AdminNavRoute, MenuRoute, serverName } from 'utils/routes';

export const visitRolesPage = () => {
  cy.visit(`/${serverName}${MenuRoute.ADMIN}${AdminNavRoute.ROLES}`);
};
