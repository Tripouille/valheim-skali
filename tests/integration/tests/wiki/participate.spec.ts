import { SpecialRoleName } from 'data/role';
import { PermissionCategory, wikiPrivilege } from 'utils/permissions';
import { APIRoute, NavRoute, serverName } from 'utils/routes';
import * as Action from './action';
import * as Select from './select';

const wikiProposalSample = {
  _id: '6228cb385f506b78affc0ad1',
  proposalType: 'creation',
  authorId: '62fd01597d36a486644f8f0d',
  status: 'proposed',
  suggestions: [{ title: 'Proposal 1', content: 'Content of proposal 1', date: '2000-01-01' }],
};

describe('participate to wiki and edit wiki pages', () => {
  before(() => {
    cy.setUserRoles([SpecialRoleName.MEMBER]);
  });

  beforeEach(() => {
    cy.seedCollection('wikiPages', 'wikiPages');
    cy.revalidate([`/${serverName}/wiki/wiki-page-1`]);
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
      cy.intercept('GET', APIRoute.WIKI_PROPOSALS).as('getWikiProposals');

      // Propose
      Action.visitWikiPage();
      cy.dataCy('participate').click();
      cy.wait('@getWikiProposals');
      cy.dataCy('propose').click();
      cy.url({ timeout: 5000 }).should('include', '/wiki/proposals/new');
      cy.main().should('contain.text', 'Proposer une nouvelle page wiki');
      cy.dataCy('title', 'input').type('Title');
      cy.dataCy('content', 'textarea').type('Content');
      cy.dataCy('submit', 'button').click();

      // See proposal
      cy.wait('@proposeWikiPageCreation');
      cy.wait('@getWikiProposals');
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
      cy.intercept('GET', APIRoute.SESSION).as('getSession');
      cy.intercept('GET', `${APIRoute.WIKI_PROPOSALS}/*`).as('getWikiProposal');
      cy.reload();
      cy.wait('@getSession');
      cy.wait('@getWikiProposal');
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
        .and('contain.text', 'Voir la page wiki originale')
        .and('contain.text', 'Modifier')
        .and('contain.text', 'Wiki page 1 edited')
        .and('contain.text', 'Wiki page 1 content edited')
        .and('contain.text', 'Proposé par TestUser');
      cy.dataCy('validate').should('not.exist');

      // Validate
      cy.setPermission(SpecialRoleName.MEMBER, PermissionCategory.WIKI, wikiPrivilege.WRITE);
      cy.intercept('GET', APIRoute.SESSION).as('getSession');
      cy.intercept('GET', `${APIRoute.WIKI_PROPOSALS}/*`).as('getWikiProposal');
      cy.reload();
      cy.wait('@getSession');
      cy.wait('@getWikiProposal');
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

    it('should be able to edit a wiki page creation proposal, and the last version is used when validated', () => {
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

      // Validate
      cy.setPermission(SpecialRoleName.MEMBER, PermissionCategory.WIKI, wikiPrivilege.WRITE);
      cy.intercept('GET', APIRoute.SESSION).as('getSession');
      cy.reload();
      cy.wait('@getSession');
      cy.wait('@getWikiProposal');
      cy.dataCy('validate').click();
      cy.dataCy('confirm-validate').click();
      cy.url({ timeout: 5000 }).should('include', '/wiki/proposal-1-edited');
      cy.main().should('have.text', 'Proposal 1 editedContent of proposal 1 edited');
    });

    it('should be able to edit a wiki page edition proposal, and the last version is used when validated', () => {
      cy.task('seedCollection', {
        collectionName: 'wikiProposals',
        data: [
          {
            ...wikiProposalSample,
            proposalType: 'edition',
            wikiPageId: '6228cb385f506b78affc0ac1',
          },
        ],
      });
      cy.revalidate([`/${serverName}/wiki/wiki-page-1`]);
      cy.intercept('PUT', `${APIRoute.WIKI_PROPOSALS}/*`).as('editWikiProposal');
      cy.intercept('GET', APIRoute.WIKI_PROPOSALS).as('getWikiProposals');
      cy.intercept('GET', `${APIRoute.WIKI_PROPOSALS}/*`).as('getWikiProposal');

      // Propose edition
      Action.visitWikiPage();
      cy.dataCy('participate').click();
      cy.wait('@getWikiProposals');
      cy.dataCy('wiki-proposal-0').click();
      cy.main().should('contain.text', 'Voir la page wiki originale');
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
      cy.main({ timeout: 2000 })
        .should('contain.text', '← Voir toutes mes propositions')
        .and('contain.text', 'Modifier')
        .and('contain.text', 'Proposal 1 edited')
        .and('contain.text', 'Content of proposal 1 edited')
        .and('contain.text', 'Proposal 1')
        .and('contain.text', 'Proposé par TestUser');

      // Validate
      cy.setPermission(SpecialRoleName.MEMBER, PermissionCategory.WIKI, wikiPrivilege.WRITE);
      cy.intercept('GET', APIRoute.SESSION).as('getSession');
      cy.intercept('GET', `${APIRoute.WIKI_PROPOSALS}/*`).as('getWikiProposal');
      cy.reload();
      cy.wait('@getWikiProposal');
      cy.dataCy('validate').click();
      cy.dataCy('confirm-validate').click();
      cy.url({ timeout: 5000 }).should('include', '/wiki/proposal-1-edited');
      cy.main().should('have.text', 'Proposal 1 editedContent of proposal 1 edited');
    });

    it.only('should be able to edit a wiki page edition proposal content, and the updated wiki page is shown when validated', () => {
      cy.task('seedCollection', {
        collectionName: 'wikiProposals',
        data: [
          {
            ...wikiProposalSample,
            title: 'Wiki page 1',
            proposalType: 'edition',
            wikiPageId: '6228cb385f506b78affc0ac1',
            suggestions: [
              { title: 'Wiki page 1', content: 'Wiki page 1 content edited', date: '2000-01-01' },
            ],
          },
        ],
      });
      cy.intercept('PUT', `${APIRoute.WIKI_PROPOSALS}/*`).as('editWikiProposal');
      cy.intercept('GET', APIRoute.WIKI_PROPOSALS).as('getWikiProposals');
      cy.intercept('GET', `${APIRoute.WIKI_PROPOSALS}/*`).as('getWikiProposal');

      // Propose edition
      Action.visitWikiPage();
      cy.dataCy('participate').click();
      cy.wait('@getWikiProposals');
      cy.dataCy('wiki-proposal-0').click();
      cy.main().should('contain.text', 'Voir la page wiki originale');
      cy.dataCy('modify').click();
      cy.url({ timeout: 5000 }).should('include', '/wiki/proposals/edit/6228cb385f506b78affc0ad1');
      cy.main()
        .should('contain.text', 'Modifier une proposition wiki')
        .and('contain.text', 'Retour à la proposition');
      cy.dataCy('content', 'textarea')
        .should('have.value', 'Wiki page 1 content edited')
        .type(' twice');
      cy.dataCy('submit', 'button').click();

      // See proposal
      cy.wait('@editWikiProposal');
      cy.wait('@getWikiProposal');
      cy.main({ timeout: 1000 })
        .should('contain.text', '← Voir toutes mes propositions')
        .and('contain.text', 'Wiki page 1 content edited twice')
        .and('contain.text', 'Wiki page 1');

      // Validate
      cy.setPermission(SpecialRoleName.MEMBER, PermissionCategory.WIKI, wikiPrivilege.WRITE);
      cy.intercept('GET', APIRoute.SESSION).as('getSession');
      cy.reload();
      cy.wait('@getSession');
      cy.wait('@getWikiProposal');
      cy.dataCy('validate').click();
      cy.dataCy('confirm-validate').click();
      cy.url({ timeout: 5000 }).should('include', '/wiki/wiki-page-1');
      cy.main().should('have.text', 'Wiki page 1Wiki page 1 content edited twice');

      // Reload to test SSR
      cy.reload();
      cy.main().should('have.text', 'Wiki page 1Wiki page 1 content edited twice');
    });
  });

  context('with wiki write permission', () => {
    before(() => {
      cy.setPermission(SpecialRoleName.MEMBER, PermissionCategory.WIKI, wikiPrivilege.WRITE);
    });

    beforeEach(() => {
      cy.seedCollection('wikiPages', 'wikiPages');
      cy.seedCollection('wikiProposals', 'wikiProposals');
      cy.revalidate([
        `/${serverName}${NavRoute.WIKI}/wiki-page-1`,
        `/${serverName}${NavRoute.WIKI}/proposal-1-edited`,
      ]);
    });

    it('should update the wiki page when edited', () => {
      Action.visitWikiProposal('6228cb385f506b78affc0ab4'); // "Wiki page 1" edition proposal
      cy.dataCy('validate').click();
      cy.dataCy('confirm-validate').click();
      cy.url({ timeout: 5000 }).should('include', '/wiki/wiki-page-1');
      cy.main().should('have.text', 'Wiki page 1Wiki page 1 content edited');
    });

    it('should be able to reject a creation proposal', () => {
      cy.intercept('GET', APIRoute.WIKI_PROPOSALS).as('getWikiProposals');

      Action.visitWikiProposal('6228cb385f506b78affc0ab1'); // "Proposal 1 edited" creation proposal
      cy.dataCy('reject').click();
      cy.dataCy('confirm-reject').click();
      cy.url({ timeout: 5000 }).should('include', '/admin/wiki-proposals');
      cy.wait('@getWikiProposals');
      cy.dataCy('rejected-icon').should('have.length', 2);

      cy.visit(`/${serverName}/wiki/proposal-1-edited`, { failOnStatusCode: false });
      cy.main().should('contain.text', '404');
    });

    it('should be able to reject an edition proposal', () => {
      cy.intercept('GET', APIRoute.WIKI_PROPOSALS).as('getWikiProposals');

      Action.visitWikiProposal('6228cb385f506b78affc0ab4'); // "Wiki page 1" edition proposal
      cy.dataCy('reject').click();
      cy.dataCy('confirm-reject').click();
      cy.url({ timeout: 5000 }).should('include', '/admin/wiki-proposals');
      cy.wait('@getWikiProposals');
      cy.dataCy('rejected-icon').should('have.length', 2);

      cy.visit(`/${serverName}/wiki/wiki-page-1`);
      cy.main().should('contain.text', 'Wiki page 1 content');
      cy.main().should('not.contain.text', 'Wiki page 1 content edited');
    });
  });
});
