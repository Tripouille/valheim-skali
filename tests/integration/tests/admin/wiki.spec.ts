import { SpecialRoleName } from 'data/role';
import { PermissionCategory, wikiPrivilege } from 'utils/permissions';
import { APIRoute } from 'utils/routes';
import * as Action from './action';
import * as Select from './select';

describe('wiki pages', () => {
  beforeEach(() => {
    cy.setUserRoles([SpecialRoleName.MEMBER]);
    cy.setPermission(SpecialRoleName.MEMBER, PermissionCategory.WIKI, wikiPrivilege.WRITE);
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
        Select.wikiProposalsLines().should('have.length', 3);
        cy.dataCy('wiki-proposal-0')
          .should('contain.text', 'Proposal 1 edited')
          .and('contain.text', 'TestUser name in game');
        cy.dataCy('wiki-proposal-0').dataCy('edit', 'button').should('exist');
        cy.dataCy('wiki-proposal-1').dataCy('rejected-icon').should('exist');
        cy.dataCy('wiki-proposal-2').dataCy('validated-icon').should('exist');
      });

      it('should navigate to wiki proposal page on click', () => {
        Select.wikiProposalsLines().should('have.length', 3);
        cy.dataCy('wiki-proposal-0').click();
        cy.dataCy('wiki-proposal-page').should('exist');
        cy.go('back');
        Select.wikiProposalsLines().should('have.length', 3);
        cy.dataCy('wiki-proposal-1').click();
        cy.dataCy('wiki-proposal-page').should('exist');
      });
    });
  });

  describe.only('wiki pages table', () => {
    it('should display a message when there is no wiki page', () => {
      cy.task('seedCollection', { collectionName: 'wikiPages', data: [] });
      Action.visitWikiPagesPage();
      cy.dataCy('admin').should('contain.text', "Aucune page wiki n'a été validée.");
    });

    context('with wiki pages', () => {
      beforeEach(() => {
        cy.seedCollection('wikiPages', 'wikiPages');
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
        cy.wait('@updateWikiPage').its('response.statusCode').should('eq', 200);
        cy.dataCy('wiki-page-0').dataCy('essential').should('exist');

        cy.dataCy('wiki-page-2').dataCy('essential').should('exist');
        cy.dataCy('wiki-page-2')
          .dataCy('tags-form')
          .dataCy('essential')
          .dataCy('close', 'button')
          .click();
        cy.wait('@updateWikiPage').its('response.statusCode').should('eq', 200);
        cy.dataCy('wiki-page-2').dataCy('essential').should('not.exist');
        cy.dataCy('wiki-page-2').dataCy('add-tag', 'button').should('exist');
      });

      it('should navigate to wiki page on click and track views', () => {
        Select.wikiPagesLines().should('have.length', 3);
        cy.dataCy('wiki-page-0').find('td').first().click();
        cy.get('main', { timeout: 6000 }).should('contain.text', 'Wiki page 1 content');

        cy.go('back');
        cy.dataCy('wiki-page-0').dataCy('views').should('contain.text', 1);
      });
    });
  });
});