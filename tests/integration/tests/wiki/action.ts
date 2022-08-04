import { NavRoute, serverName } from 'utils/routes';

export const visitWikiPage = (slug?: string) => {
  cy.visit(`/${serverName}${NavRoute.WIKI}/${slug ?? ''}`);
};
