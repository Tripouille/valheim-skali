import { Application, ApplicationStatus } from 'data/application';
import { SpecialRoleName } from 'data/role';
import {
  applicationPrivilege,
  PermissionCategory,
  rolePrivilege,
  userPrivilege,
} from 'utils/permissions';
import { getRoute, NavRoute } from 'utils/routes';
import * as Action from './action';

describe('applications list', () => {
  before(() => {
    cy.seedCollection('users', 'users');
    cy.setUserRoles([SpecialRoleName.MEMBER]);
  });

  beforeEach(() => {
    cy.seedCollection('applications', 'applications');
    cy.login();
    cy.visit(getRoute(NavRoute.APPLICATIONS));
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
      cy.dataCy('application-modal').and('contain.text', 'Promu(e) Viking');
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

    it('can read the questionnaire', () => {
      cy.dataCy('application').last().click();
      cy.dataCy('application').last().dataCy('see').click();
      cy.dataCy('questionnaire', 'a').click();
      cy.dataCy('application-modal').should('not.contain.text', 'Statut');
      cy.dataCy('application-modal')
        .should(
          'contain.text',
          'Simple question 1Simple answer 1Long question 1Long answer 1 Lorem ipsum',
        )
        .and(
          'contain.text',
          'Single choice question 1Option 1Option 2Option 3Multiple choice question 1Option 1Option 2Option 3',
        );
      cy.dataCy('application-modal').dataCy('back').first().click();
      cy.dataCy('application-modal').should('not.contain.text', 'Simple question');
      cy.dataCy('application-modal').should('contain.text', 'Statut');
    });

    it('edits an application', () => {
      cy.intercept('PUT', '/api/applications/*').as('editApplication');

      // Edit an application associated with user
      cy.dataCy('application').last().click();
      cy.dataCy('application').last().dataCy('see').click();
      cy.dataCy('edit').click();
      cy.dataCy('edit-application-modal').find('img').should('exist');
      cy.dataCy('associate-to-user', 'select').should('have.value', '6330935d99a9ab9e2caaa9fe');
      cy.dataCy('discordName', 'input').should('not.exist');
      cy.dataCy('nameInGame', 'input').should('have.value', 'TestUser name in game').type('2');
      cy.dataCy('submit', 'button').click();
      cy.wait('@editApplication').its('response.statusCode').should('eq', 200);
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
      cy.wait('@editApplication').its('response.statusCode').should('eq', 200);
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
      cy.wait('@editApplication').its('response.statusCode').should('eq', 200);
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
      cy.intercept('PATCH', '/api/applications/*').as('patchApplication');
      // Cannot change a promoted application status
      cy.dataCy('application').last().click();
      cy.dataCy('application').last().dataCy('see').click();
      cy.dataCy('application-modal').dataCy('change-status-to-next').should('not.exist');
      cy.dataCy('application-modal').dataCy('choose-another-status').should('not.exist');
      cy.dataCy('close-modal').click();
      cy.dataCy('application-modal').should('not.exist');

      if (Cypress.env('ENV') !== 'CI') {
        // TOFIX: bugs in CI
        // Can change an application status back and forth
        cy.dataCy('application').first().dataCy('see').click();
        cy.dataCy('application-modal').should('contain.text', "En attente d'un entretien");
        cy.dataCy('application-modal').dataCy('change-status-to-next').click();
        cy.wait('@patchApplication').its('response.statusCode').should('eq', 200);
        cy.dataCy('application-modal').should('contain.text', 'Entretien programmé');
        cy.dataCy('application-modal').dataCy('change-status-to-next').click();
        cy.wait('@patchApplication').its('response.statusCode').should('eq', 200);
        cy.dataCy('application-modal').should('contain.text', 'En attente de réponse');
        cy.dataCy('application-modal').dataCy('choose-another-status').click();
        cy.dataCy('choose-another-status-popover')
          .find('input[type="radio"][value="promoted"]')
          .should('be.disabled');
        Action.chooseAnotherStatus(ApplicationStatus.SCHEDULED_APPOINTMENT);
        cy.wait('@patchApplication').its('response.statusCode').should('eq', 200);
        cy.dataCy('application-modal').should('contain.text', 'Entretien programmé');
        cy.dataCy('application-modal').dataCy('choose-another-status').click();
        Action.chooseAnotherStatus(ApplicationStatus.WAITING_FOR_APPOINTMENT);
        cy.wait('@patchApplication').its('response.statusCode').should('eq', 200);
        cy.dataCy('application-modal').should('contain.text', "En attente d'un entretien");
      }
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

      if (Cypress.env('ENV') !== 'CI') {
        // TOFIX: bugs in CI
        // Start editing and cancel
        cy.dataCy('comment').dataCy('edit').click();
        cy.dataCy('comment').find('textarea').clear().type("I don't like this guy");
        cy.dataCy('comment').dataCy('cancel-comment-edition').click();
        cy.dataCy('comment').find('textarea').should('not.be.visible');
        cy.dataCy('comment').should('contain.text', 'I like this guy !');
        cy.wait(200);

        // Edit comment
        cy.dataCy('comment').dataCy('edit').click();
        cy.dataCy('comment').find('textarea').type('2');
        cy.dataCy('comment').dataCy('submit-edited-comment').click();
        cy.wait('@editComments');
        cy.wait('@getComments');
        cy.dataCy('comment')
          .should('contain.text', 'I like this guy !2')
          .and('contain.text', '(édité le');
      }
    });
  });

  context('with promote permission', () => {
    before(() => {
      cy.setPermission(
        SpecialRoleName.MEMBER,
        PermissionCategory.APPLICATION,
        applicationPrivilege.PROMOTE,
      );
      cy.setPermission(SpecialRoleName.MEMBER, PermissionCategory.ROLE, rolePrivilege.READ);
      cy.setPermission(SpecialRoleName.MEMBER, PermissionCategory.USER, userPrivilege.READ);
    });

    it('can promote and demote applications', () => {
      cy.fixture<Array<Application>>('applications').then(data =>
        cy.task('seedCollection', {
          collectionName: 'applications',
          data: [
            ...data,
            {
              _id: 'abb0935d99a9ab9e2caaa9f3',
              userId: '61a39fbfc2b465b017a81b9f',
              comments: [],
              applicationFormAnswer: {
                nameInGame: 'Name in game2',
                steamName: 'Steam name',
                steamID: '76561198000000001',
                whereDidYouFindTheServer: 'I found it... ',
                whyDidYouChooseThisServer: 'I chose it... ',
                whatAreYourPlansAsAViking: 'I plan to... ',
                background: 'I was a Viking... ',
              },
              status: 'waiting_for_appointment',
              createdAt: '2000-01-02T14:00:00.000Z',
            },
          ],
        }),
      );
      cy.intercept('/api/users').as('getUsers');
      cy.intercept('PATCH', '/api/applications/*').as('patchApplication');

      // Promote and demote an application non associated to any user
      cy.dataCy('application').first().dataCy('see').click();
      cy.dataCy('application-modal').dataCy('choose-another-status').click();
      Action.chooseAnotherStatus(ApplicationStatus.PROMOTED);
      cy.wait('@patchApplication').its('response.statusCode').should('eq', 200);
      cy.dataCy('application-modal').should('contain.text', 'Promu(e) Viking');
      cy.dataCy('application-modal').dataCy('choose-another-status').click();
      Action.chooseAnotherStatus(ApplicationStatus.REFUSED);
      cy.wait('@patchApplication').its('response.statusCode').should('eq', 200);
      cy.dataCy('application-modal').should('contain.text', 'Refusé(e)');
      cy.dataCy('application-modal').dataCy('choose-another-status').click();
      Action.chooseAnotherStatus(ApplicationStatus.WAITING_FOR_APPOINTMENT);
      cy.wait('@patchApplication').its('response.statusCode').should('eq', 200);
      cy.dataCy('application-modal').should('contain.text', "En attente d'un entretien");
      cy.dataCy('close-modal').click();

      // Promote an application assciated to a user and check in admin
      cy.dataCy('application').first().dataCy('see').click();
      cy.dataCy('application-modal').dataCy('choose-another-status').click();
      Action.chooseAnotherStatus(ApplicationStatus.WAITING_FOR_ANSWER);
      cy.wait('@patchApplication').its('response.statusCode').should('eq', 200);
      cy.dataCy('application-modal').should('contain.text', 'En attente de réponse');
      cy.dataCy('change-status-to-next').click();
      cy.wait('@patchApplication').its('response.statusCode').should('eq', 200);
      cy.dataCy('application-modal').should('contain.text', 'Promu(e) Viking');

      cy.dataCy('close-modal').click();
      cy.dataCy('nav-bar').dataCy('menu', 'button').click();
      cy.dataCy('nav-bar').dataCy('admin').click();
      cy.wait('@getUsers');
      cy.main().should('contain.text', 'User1');

      cy.dataCy('Candidatures-nav-item').click();

      // Demote the application and check in admin
      cy.dataCy('application').first().dataCy('see').click();
      cy.dataCy('application-modal').dataCy('choose-another-status').click();
      Action.chooseAnotherStatus(ApplicationStatus.WAITING_FOR_ANSWER);
      cy.wait('@patchApplication').its('response.statusCode').should('eq', 200);
      cy.dataCy('application-modal').should('contain.text', 'En attente de réponse');

      cy.dataCy('close-modal').click();
      cy.dataCy('nav-bar').dataCy('menu', 'button').click();
      cy.dataCy('nav-bar').dataCy('admin').click();
      cy.dataCy('Âmes perdues').click();
      cy.wait('@getUsers');
      cy.main().should('contain.text', 'User1');

      cy.dataCy('Candidatures-nav-item').click();

      // Refuse the application and check in admin
      cy.dataCy('application').first().dataCy('see').click();
      cy.dataCy('application-modal').dataCy('choose-another-status').click();
      Action.chooseAnotherStatus(ApplicationStatus.REFUSED);
      cy.wait('@patchApplication').its('response.statusCode').should('eq', 200);
      cy.dataCy('application-modal').should('contain.text', 'Refusé(e)');

      cy.dataCy('close-modal').click();
      cy.dataCy('nav-bar').dataCy('menu', 'button').click();
      cy.dataCy('nav-bar').dataCy('admin').click();
      cy.wait('@getUsers');
      cy.main().should('not.contain.text', 'User1');
      cy.dataCy('Âmes perdues').click();
      cy.main().should('contain.text', 'User1');
    });
  });
});
