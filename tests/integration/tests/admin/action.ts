import { AdminNavRoute, APIRoute, getRoute, MenuRoute } from 'utils/routes';

export const visitRolesPage = () => {
  cy.intercept(APIRoute.ROLES).as('getRoles');
  cy.visit(getRoute(`${MenuRoute.ADMIN}/${AdminNavRoute.ROLES}`));
  cy.wait('@getRoles');
};

export const visitUsersPage = (subRoute: AdminNavRoute) => {
  cy.intercept(APIRoute.USERS).as('getUsers');
  cy.visit(getRoute(`${MenuRoute.ADMIN}/${subRoute}`));
  cy.wait('@getUsers');
};

export const visitWikiProposalsPage = () => {
  cy.intercept(APIRoute.WIKI_PROPOSALS).as('getWikiProposals');
  cy.visit(getRoute(`${MenuRoute.ADMIN}/${AdminNavRoute.WIKI_PROPOSALS}`));
  cy.wait('@getWikiProposals');
};

export const visitWikiPagesPage = () => {
  cy.intercept(APIRoute.WIKI).as('getWikiPages');
  cy.visit(getRoute(`${MenuRoute.ADMIN}/${AdminNavRoute.WIKI}`));
  cy.wait('@getWikiPages');
};
