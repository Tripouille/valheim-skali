import { AdminNavRoute, APIRoute, MenuRoute, serverName } from 'utils/routes';

export const visitRolesPage = () => {
  cy.intercept(APIRoute.ROLES).as('getRoles');
  cy.visit(`/${serverName}${MenuRoute.ADMIN}${AdminNavRoute.ROLES}`);
  cy.wait('@getRoles');
};

export const visitUsersPage = (subRoute: AdminNavRoute) => {
  cy.intercept(APIRoute.USERS).as('getUsers');
  cy.visit(`/${serverName}${MenuRoute.ADMIN}${subRoute}`);
  cy.wait('@getUsers');
};

export const visitWikiProposalsPage = () => {
  cy.intercept(APIRoute.WIKI_PROPOSALS).as('getWikiProposals');
  cy.visit(`/${serverName}${MenuRoute.ADMIN}${AdminNavRoute.WIKI_PROPOSALS}`);
  cy.wait('@getWikiProposals');
};

export const visitWikiPagesPage = () => {
  cy.intercept(APIRoute.WIKI).as('getWikiPages');
  cy.visit(`/${serverName}${MenuRoute.ADMIN}${AdminNavRoute.WIKI}`);
  cy.wait('@getWikiPages');
};
