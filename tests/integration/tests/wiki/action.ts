import { getRoute, NavRoute } from 'utils/routes';

export const visitWikiPage = (slug?: string) => {
  cy.visit(getRoute(`${NavRoute.WIKI}/${slug ?? ''}`));
};

export const visitWikiProposal = (id: string) => {
  cy.visit(getRoute(`${NavRoute.WIKI}/proposals/${id}`));
};
