import { ApplicationStatus } from 'data/application';
import { SpecialRoleName } from 'data/role';
import { applicationPrivilege, PermissionCategory } from 'utils/permissions';
import { getRoute } from 'utils/routes';
import * as Action from './action';

describe('applications list', () => {
  before(() => {
    cy.seedCollection('users', 'users');
    cy.setUserRoles([SpecialRoleName.MEMBER]);
  });

  beforeEach(() => {
    cy.seedCollection('applications', 'applications');
    cy.login();
    cy.visit(getRoute('applications'));
  });

  context('with read only permission', () => {
    before(() => {
      cy.setPermission(
        SpecialRoleName.MEMBER,
        PermissionCategory.APPLICATION,
        applicationPrivilege.READ,
      );
    });

    it('should see the applications but not the comments or edit tools', () => {
      cy.dataCy('application').should('have.length', 2);
      cy.dataCy('create-application').should('not.exist');
      cy.dataCy('application').last().click();
      cy.dataCy('application').last().dataCy('see').click();
      cy.dataCy('application-modal')
        .should('contain.text', 'Candidature créée le 1 janv., 14:00')
        .and('contain.text', 'Promu(e) Viking');
      cy.dataCy('application-modal').dataCy('edit').should('not.exist');
      cy.dataCy('application-modal').dataCy('change-status-to-next').should('not.exist');
      cy.dataCy('application-modal').dataCy('choose-another-status').should('not.exist');
      cy.dataCy('comment').should('not.exist');
    });
  });

  context('with manage permission', () => {
    before(() => {
      cy.setPermission(
        SpecialRoleName.MEMBER,
        PermissionCategory.APPLICATION,
        applicationPrivilege.MANAGE,
      );
    });

    it('creates an application with an input discord name and from a real user', () => {
      const fillApplicationForm = ({ nameInGame }) => {
        cy.dataCy('nameInGame', 'input').type(nameInGame);
        cy.dataCy('steamName', 'input').type('Steam name');
        cy.dataCy('steamID', 'input').type('Steam id');
        cy.dataCy('whereDidYouFindTheServer', 'textarea').type('I found the server...');
        cy.dataCy('whyDidYouChooseThisServer', 'textarea').type('I chose this server...');
        cy.dataCy('whatAreYourPlansAsAViking', 'textarea').type('I plan to...');
        cy.dataCy('background', 'textarea').type('I was a Viking...');
      };

      // Writing the discord name
      cy.dataCy('create-application').click();
      cy.dataCy('discordName', 'input').type('New discord name');
      fillApplicationForm({ nameInGame: 'New name in game' });
      cy.dataCy('submit', 'button').click();
      cy.dataCy('create-application-modal').should('not.exist');
      cy.dataCy('application-modal').should('not.exist');
      cy.dataCy('application')
        .should('have.length', 3)
        .and('contain.text', 'New name in game (New discord name)')
        .and('contain.text', "En attente d'un entretien");

      // Associating a real user
      cy.dataCy('create-application').click();
      cy.dataCy('associate-to-user', 'select').children().should('have.length', 2);
      cy.dataCy('associate-to-user', 'select').select('User1');
      cy.dataCy('discordName', 'input').should('not.exist');
      cy.dataCy('create-application-modal').find('p').should('contain.text', 'User1');
      fillApplicationForm({ nameInGame: 'Name in game2' });
      cy.dataCy('submit', 'button').click();
      cy.dataCy('create-application-modal').should('not.exist');
      cy.dataCy('application-modal').should('not.exist');
      cy.dataCy('application')
        .should('have.length', 4)
        .and('contain.text', 'Name in game2 (User1)');
    });

    it('edits an application', () => {
      // Edit an application associated with user
      cy.dataCy('application').last().click();
      cy.dataCy('application').last().dataCy('see').click();
      cy.dataCy('edit').click();
      cy.dataCy('edit-application-modal').find('img').should('exist');
      cy.dataCy('associate-to-user', 'select').should('have.value', '6330935d99a9ab9e2caaa9fe');
      cy.dataCy('discordName', 'input').should('not.exist');
      cy.dataCy('nameInGame', 'input').should('have.value', 'TestUser name in game').type('2');
      cy.dataCy('submit', 'button').click();
      cy.dataCy('application-modal').should('contain.text', 'TestUser name in game2');
      cy.dataCy('edit-application-modal').should('not.exist');
      cy.dataCy('application-modal').should('contain.text', 'La candidature a été mise à jour');
      cy.dataCy('application-modal').dataCy('comment').should('have.length', 2);
      cy.dataCy('close-modal').click();

      // Edit an application with a discord name
      cy.dataCy('application').first().dataCy('see').click();
      cy.dataCy('edit').click();
      cy.dataCy('edit-application-modal').find('img').should('not.exist');
      cy.dataCy('associate-to-user', 'select').should('have.value', '');
      cy.dataCy('discordName', 'input').should('have.value', 'Discord name').type('2');
      cy.dataCy('nameInGame', 'input').should('have.value', 'Name in game').type('2');
      cy.dataCy('submit', 'button').click();
      cy.dataCy('edit-application-modal').should('not.exist');
      cy.dataCy('application-modal')
        .should('contain.text', 'Discord name2')
        .and('contain.text', 'Name in game2');
      cy.dataCy('application-modal').should('contain.text', 'La candidature a été mise à jour');

      // Associate an application to a user
      cy.dataCy('edit').click();
      cy.dataCy('associate-to-user', 'select').select('User1');
      cy.dataCy('edit-application-modal').find('img').should('exist');
      cy.dataCy('discordName', 'input').should('not.exist');
      cy.dataCy('submit', 'button').click();
      cy.dataCy('application-modal').should('contain.text', 'Name in game2 (User1)');
      cy.dataCy('application-modal').should('contain.text', 'La candidature a été mise à jour');
      cy.dataCy('application-modal').dataCy('comment').should('have.length', 1);
    });

    it('deletes an aplication', () => {
      cy.dataCy('application').first().dataCy('see').click();
      cy.dataCy('edit').click();
      cy.dataCy('delete').click();
      cy.dataCy('edit-application-modal').should(
        'contain.text',
        'Êtes-vous sûr de vouloir supprimer',
      );
      cy.dataCy('confirm-delete').click();
      cy.dataCy('application').should('have.length', 1);
    });

    it('changes application status except from/to promoted', () => {
      // Cannot change a promoted application status
      cy.dataCy('application').last().click();
      cy.dataCy('application').last().dataCy('see').click();
      cy.dataCy('application-modal').dataCy('change-status-to-next').should('not.exist');
      cy.dataCy('application-modal').dataCy('choose-another-status').should('not.exist');
      cy.dataCy('close-modal').click();

      // Can change an application status back and forth
      cy.dataCy('application').first().dataCy('see').click();
      cy.dataCy('application-modal').should('contain.text', "En attente d'un entretien");
      cy.dataCy('application-modal').dataCy('change-status-to-next').click();
      cy.dataCy('application-modal').should('contain.text', 'Entretien programmé');
      cy.dataCy('application-modal').dataCy('change-status-to-next').click();
      cy.dataCy('application-modal').should('contain.text', 'En attente de réponse');
      cy.dataCy('application-modal').dataCy('choose-another-status').click();
      cy.dataCy('choose-another-status-popover')
        .find('input[type="radio"][value="promoted"]')
        .should('be.disabled');
      Action.chooseAnotherStatus(ApplicationStatus.SCHEDULED_APPOINTMENT);
      cy.dataCy('application-modal').should('contain.text', 'Entretien programmé');
      cy.dataCy('application-modal').dataCy('choose-another-status').click();
      Action.chooseAnotherStatus(ApplicationStatus.WAITING_FOR_APPOINTMENT);
      cy.dataCy('application-modal').should('contain.text', "En attente d'un entretien");
    });

    it('writes a comment then edits it', () => {
      // Create comment
      cy.dataCy('application').first().dataCy('see').click();
      cy.dataCy('comment').should('have.length', 0);
      cy.dataCy('comment-body', 'textarea').type('I like this guy !');
      cy.intercept('PATCH', '/api/applications/*').as('editComments');
      cy.intercept('GET', '/api/applications').as('getComments');
      cy.dataCy('submit-comment').click();
      cy.wait('@editComments');
      cy.wait('@getComments');
      cy.dataCy('comment').should('have.length', 1);
      cy.dataCy('comment').should('contain.text', 'I like this guy !');

      // Start editing and cancel
      cy.dataCy('comment').dataCy('edit').click();
      cy.dataCy('comment').find('textarea').clear().type("I don't like this guy");
      cy.dataCy('comment').dataCy('cancel-comment-edition').click();
      cy.dataCy('comment').find('textarea').should('not.be.visible');
      cy.dataCy('comment').should('contain.text', 'I like this guy !');

      // Edit comment
      cy.dataCy('comment').dataCy('edit').click();
      cy.dataCy('comment').find('textarea').type('2');
      cy.dataCy('comment').dataCy('submit-edited-comment').click();
      cy.wait('@editComments');
      cy.wait('@getComments');
      cy.dataCy('comment')
        .should('contain.text', 'I like this guy !2')
        .and('contain.text', '(édité le');
    });
  });
});
