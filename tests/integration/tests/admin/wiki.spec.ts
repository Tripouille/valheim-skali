import { SpecialRoleName } from 'data/role';
import { PermissionCategory, wikiPrivilege } from 'utils/permissions';
import { APIRoute, serverName } from 'utils/routes';
import * as Action from './action';
import * as Select from './select';

describe('wiki pages', () => {
  before(() => {
    cy.setUserRoles([SpecialRoleName.MEMBER]);
    cy.setPermission(SpecialRoleName.MEMBER, PermissionCategory.WIKI, wikiPrivilege.WRITE);
  });

  beforeEach(() => {
    cy.login();
  });

  describe('wiki proposals table', () => {
    it('should display a message when there is no proposal', () => {
      cy.task('seedCollection', { collectionName: 'wikiProposals', data: [] });
      Action.visitWikiProposalsPage();
      cy.dataCy('admin').should('contain.text', "Aucune page wiki n'a été proposée.");
    });

    context('with proposals', () => {
      beforeEach(() => {
        cy.seedCollection('wikiProposals', 'wikiProposals');
        Action.visitWikiProposalsPage();
      });

      it('should display proposals with correct infos', () => {
        cy.dataCy('admin').should('not.contain.text', "Aucune page wiki n'a été proposée.");
        Select.wikiProposalsLines().should('have.length', 4);
        cy.dataCy('wiki-proposal-0')
          .should('contain.text', 'Proposal 1 edited')
          .and('contain.text', 'TestUser name in game');
        cy.dataCy('wiki-proposal-0').dataCy('edit', 'button').should('exist');
        cy.dataCy('wiki-proposal-1').dataCy('edit', 'button').should('exist');
        cy.dataCy('wiki-proposal-2').dataCy('rejected-icon').should('exist');
        cy.dataCy('wiki-proposal-3').dataCy('validated-icon').should('exist');
      });

      it('should navigate to wiki proposal page on click', () => {
        Select.wikiProposalsLines().should('have.length', 4);
        cy.dataCy('wiki-proposal-0').click();
        cy.dataCy('wiki-proposal-page').should('exist');
        cy.go('back');
        Select.wikiProposalsLines().should('have.length', 4);
        cy.dataCy('wiki-proposal-1').click();
        cy.dataCy('wiki-proposal-page').should('exist');
      });
    });
  });

  describe('wiki pages table', () => {
    it('should display a message when there is no wiki page', () => {
      cy.task('seedCollection', { collectionName: 'wikiPages', data: [] });
      Action.visitWikiPagesPage();
      cy.dataCy('admin').should('contain.text', "Aucune page wiki n'a été validée.");
    });

    context('with wiki pages', () => {
      beforeEach(() => {
        cy.seedCollection('wikiPages', 'wikiPages');
        cy.revalidate([`/${serverName}/wiki`]);
        cy.revalidate([`/${serverName}/wiki/wiki-page-1`]);
        Action.visitWikiPagesPage();
      });

      it('should display wiki pages with correct infos', () => {
        cy.dataCy('admin').should('not.contain.text', "Aucune page wiki n'a été validée.");
        Select.wikiPagesLines().should('have.length', 3);
        cy.dataCy('wiki-page-0')
          .should('contain.text', 'Wiki page 1')
          .and('contain.text', 0)
          .dataCy('add-tag', 'button')
          .should('exist');
        cy.dataCy('wiki-page-1')
          .should('contain.text', 'Wiki page 2')
          .and('contain.text', 200)
          .dataCy('add-tag', 'button')
          .should('exist');
        cy.dataCy('wiki-page-2')
          .should('contain.text', 'Wiki page 3')
          .and('contain.text', 5)
          .dataCy('add-tag', 'button')
          .should('not.exist');
      });

      it('should be able to change wiki pages tags', () => {
        cy.intercept('PATCH', `${APIRoute.WIKI}/**`).as('updateWikiPage');

        Select.wikiPagesLines().should('have.length', 3);
        cy.dataCy('wiki-page-0').dataCy('essential').should('not.exist');
        cy.dataCy('wiki-page-0').dataCy('add-tag', 'button').click();
        cy.dataCy('add-tag-essential', 'button').click();
        cy.wait('@updateWikiPage');
        cy.dataCy('wiki-page-0').dataCy('essential').should('exist');
        cy.dataCy('Wiki-nav-item').click();
        cy.main().should('contain.text', "L'essentielWiki page 1Wiki page 2Wiki page 3");
        cy.go('back');

        cy.dataCy('wiki-page-2').dataCy('essential').should('exist');
        cy.dataCy('wiki-page-2')
          .dataCy('tags-form')
          .dataCy('essential')
          .dataCy('close', 'button')
          .click();
        cy.wait('@updateWikiPage');
        cy.dataCy('wiki-page-2').dataCy('essential').should('not.exist');
        cy.dataCy('wiki-page-2').dataCy('add-tag', 'button').should('exist');
        cy.dataCy('Wiki-nav-item').click();
        cy.main().should('not.contain.text', "L'essentielWiki page 1Wiki page 2Wiki page 3");
      });

      it.only('should navigate to wiki page on click and track views', () => {
        cy.intercept('PUT', `${APIRoute.WIKI}/wiki-page-1/trackView`).as('trackView');
        Select.wikiPagesLines().should('have.length', 3);
        cy.dataCy('wiki-page-0').find('td').first().click();
        cy.get('main', { timeout: 6000 }).should('contain.text', 'Wiki page 1 content');
        cy.wait('@trackView');

        cy.intercept(APIRoute.WIKI).as('getWikiPages');
        cy.go('back');
        cy.wait('@getWikiPages');
        cy.dataCy('wiki-page-0').dataCy('views').should('contain.text', 1);
      });

      it('should be able to delete a wiki page and associated proposals should be deleted too', () => {
        cy.seedCollection('wikiProposals', 'wikiProposals');
        cy.intercept('DELETE', `${APIRoute.WIKI}/*`).as('deleteWikiPage');

        cy.dataCy('wiki-page-0').dataCy('delete', 'button').click();
        cy.dataCy('confirm-delete', 'button').filter(':visible').click();
        cy.wait('@deleteWikiPage').its('response.statusCode').should('eq', 200);
        Select.wikiPagesLines().should('have.length', 2);

        cy.dataCy('Propositions Wiki', 'a').click();
        cy.main().should('not.contain.text', 'Wiki page 1');

        cy.visit(`/${serverName}/wiki/wiki-page-1`, { failOnStatusCode: false });
        cy.main().should('contain.text', '404');
      });
    });
  });
});
