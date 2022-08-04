import { SpecialRoleName } from 'data/role';
import { PermissionCategory, wikiPrivilege } from 'utils/permissions';
import { APIRoute } from 'utils/routes';
import * as Action from './action';
import * as Select from './select';

const wikiProposalSample = {
  _id: '6228cb385f506b78affc0ad1',
  proposalType: 'creation',
  authorId: '6230b7f8d9758180e91b6b20',
  status: 'proposed',
  suggestions: [{ title: 'Proposal 1', content: 'Content of proposal 1', date: '2000-01-01' }],
};

describe('propose wiki pages', () => {
  before(() => {
    cy.seedCollection('wikiPages', 'wikiPages');
    cy.setUserRoles([SpecialRoleName.MEMBER]);
  });

  beforeEach(() => {
    cy.task('seedCollection', { collectionName: 'wikiProposals', data: [] });
    cy.login();
  });

  context('without wiki permission', () => {
    before(() => {
      cy.setPermission(SpecialRoleName.MEMBER, PermissionCategory.WIKI, wikiPrivilege.NONE);
    });

    it('should not see the participate button in wiki home', () => {
      Action.visitWikiPage();
      cy.dataCy('participate').should('not.exist');
    });

    it('should not see the edit button on a wiki page', () => {
      Action.visitWikiPage('wiki-page-1');
      cy.dataCy('edit').should('not.exist');
    });
  });

  context('with propose permission', () => {
    beforeEach(() => {
      cy.setPermission(SpecialRoleName.MEMBER, PermissionCategory.WIKI, wikiPrivilege.PROPOSE);
    });

    it('should be able to propose a new wiki page, that is then visible when validated', () => {
      cy.intercept('POST', APIRoute.WIKI_PROPOSALS).as('proposeWikiPageCreation');

      // Propose
      Action.visitWikiPage();
      cy.dataCy('participate').click();
      cy.dataCy('propose').click();
      cy.url({ timeout: 5000 }).should('include', '/wiki/proposals/new');
      cy.main().should('contain.text', 'Proposer une nouvelle page wiki');
      cy.dataCy('title', 'input').type('Title');
      cy.dataCy('content', 'textarea').type('Content');
      cy.dataCy('submit', 'button').click();

      // See proposal
      cy.wait('@proposeWikiPageCreation');
      Select.wikiProposalsLines().should('have.length', 1).and('have.text', 'Title');
      cy.dataCy('wiki-proposal-0').click();
      cy.main({ timeout: 2000 })
        .should('contain.text', '← Voir toutes mes propositions')
        .and('contain.text', 'Modifier')
        .and('contain.text', 'Title')
        .and('contain.text', 'Content')
        .and('contain.text', 'Proposé par TestUser');
      cy.dataCy('validate').should('not.exist');

      // Validate
      cy.setPermission(SpecialRoleName.MEMBER, PermissionCategory.WIKI, wikiPrivilege.WRITE);
      cy.reload();
      cy.dataCy('validate').click();
      cy.dataCy('confirm-validate').click();
      cy.url({ timeout: 5000 }).should('include', '/wiki/title');
      cy.main().should('have.text', 'TitleContent');
    });

    it('should be able to propose a wiki page edition, that is then visible when validated', () => {
      cy.intercept('POST', `${APIRoute.WIKI_PROPOSALS}/*`).as('proposeWikiPageEdition');
      cy.intercept('GET', APIRoute.WIKI_PROPOSALS).as('getWikiProposals');

      // Propose edition
      Action.visitWikiPage('wiki-page-1');
      cy.dataCy('edit').click();
      cy.url({ timeout: 5000 }).should('include', '/wiki/proposals/new/6228cb385f506b78affc0ac1');
      cy.main()
        .should('contain.text', 'Proposer une modification de page wiki')
        .and('contain.text', 'Retour à la page wiki');
      cy.dataCy('title', 'input').should('have.value', 'Wiki page 1').type(' edited');
      cy.dataCy('content', 'textarea').should('have.value', 'Wiki page 1 content').type(' edited');
      cy.dataCy('submit', 'button').click();

      // See proposal
      cy.wait('@proposeWikiPageEdition');
      cy.wait('@getWikiProposals');
      Select.wikiProposalsLines().should('have.length', 1).and('have.text', 'Wiki page 1 edited');
      cy.dataCy('wiki-proposal-0').click();
      cy.main({ timeout: 2000 })
        .should('contain.text', '← Voir toutes mes propositions')
        .and('contain.text', 'Modifier')
        .and('contain.text', 'Wiki page 1 edited')
        .and('contain.text', 'Wiki page 1 content edited')
        .and('contain.text', 'Proposé par TestUser');
      cy.dataCy('validate').should('not.exist');

      // Validate
      cy.setPermission(SpecialRoleName.MEMBER, PermissionCategory.WIKI, wikiPrivilege.WRITE);
      cy.reload();
      cy.dataCy('validate').click();
      cy.dataCy('confirm-validate').click();
      cy.url({ timeout: 5000 }).should('include', '/wiki/wiki-page-1-edited');
      cy.main().should('have.text', 'Wiki page 1 editedWiki page 1 content edited');
    });

    it('should only see its own proposals', () => {
      cy.task('seedCollection', {
        collectionName: 'wikiProposals',
        data: [
          wikiProposalSample,
          {
            ...wikiProposalSample,
            _id: '6228cb385f506b78affc0ad2',
            authorId: '6230b7f8d9758180e91b6b21',
          },
        ],
      });
      cy.intercept('GET', APIRoute.WIKI_PROPOSALS).as('getWikiProposals');

      Action.visitWikiPage();
      cy.dataCy('participate').click();
      cy.wait('@getWikiProposals');
      Select.wikiProposalsLines().should('have.length', 1);
    });

    it('should be able to edit a wiki page creation proposal', () => {
      cy.task('seedCollection', {
        collectionName: 'wikiProposals',
        data: [wikiProposalSample],
      });
      cy.intercept('PUT', `${APIRoute.WIKI_PROPOSALS}/*`).as('editWikiProposal');
      cy.intercept('GET', APIRoute.WIKI_PROPOSALS).as('getWikiProposals');
      cy.intercept('GET', `${APIRoute.WIKI_PROPOSALS}/*`).as('getWikiProposal');

      // Propose edition
      Action.visitWikiPage();
      cy.dataCy('participate').click();
      cy.wait('@getWikiProposals');
      cy.dataCy('wiki-proposal-0').click();
      cy.dataCy('modify').click();
      cy.url({ timeout: 5000 }).should('include', '/wiki/proposals/edit/6228cb385f506b78affc0ad1');
      cy.main()
        .should('contain.text', 'Modifier une proposition wiki')
        .and('contain.text', 'Retour à la proposition');
      cy.dataCy('title', 'input').should('have.value', 'Proposal 1').type(' edited');
      cy.dataCy('content', 'textarea')
        .should('have.value', 'Content of proposal 1')
        .type(' edited');
      cy.dataCy('submit', 'button').click();

      // See proposal
      cy.wait('@editWikiProposal');
      cy.wait('@getWikiProposal');
      cy.main()
        .should('contain.text', '← Voir toutes mes propositions')
        .and('contain.text', 'Modifier')
        .and('contain.text', 'Proposal 1 edited')
        .and('contain.text', 'Content of proposal 1 edited')
        .and('contain.text', 'Proposal 1')
        .and('contain.text', 'Proposé par TestUser');
    });

    it('should be able to edit a wiki page edition proposal', () => {
      cy.task('seedCollection', {
        collectionName: 'wikiProposals',
        data: [wikiProposalSample],
      });
      cy.intercept('PUT', `${APIRoute.WIKI_PROPOSALS}/*`).as('editWikiProposal');
      cy.intercept('GET', APIRoute.WIKI_PROPOSALS).as('getWikiProposals');
      cy.intercept('GET', `${APIRoute.WIKI_PROPOSALS}/*`).as('getWikiProposal');

      // Propose edition
      Action.visitWikiPage();
      cy.dataCy('participate').click();
      cy.wait('@getWikiProposals');
      cy.dataCy('wiki-proposal-0').click();
      cy.dataCy('modify').click();
      cy.url({ timeout: 5000 }).should('include', '/wiki/proposals/edit/6228cb385f506b78affc0ad1');
      cy.main()
        .should('contain.text', 'Modifier une proposition wiki')
        .and('contain.text', 'Retour à la proposition');
      cy.dataCy('title', 'input').should('have.value', 'Proposal 1').type(' edited');
      cy.dataCy('content', 'textarea')
        .should('have.value', 'Content of proposal 1')
        .type(' edited');
      cy.dataCy('submit', 'button').click();

      // See proposal
      cy.wait('@editWikiProposal');
      cy.wait('@getWikiProposal');
      cy.main()
        .should('contain.text', '← Voir toutes mes propositions')
        .and('contain.text', 'Modifier')
        .and('contain.text', 'Proposal 1 edited')
        .and('contain.text', 'Content of proposal 1 edited')
        .and('contain.text', 'Proposal 1')
        .and('contain.text', 'Proposé par TestUser');
    });
  });
});
