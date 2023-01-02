import { ApplicationStatus } from 'data/application';
import { SpecialRoleName } from 'data/role';
import { rulesQuestionnaireCollectionName } from 'data/rulesQuestionnaire';
import { applicationPrivilege, PermissionCategory, rulesPrivilege } from 'utils/permissions';

describe('join flow', () => {
  before(() => {
    cy.task('seedCollection', { collectionName: 'applications', data: [] });
    cy.seedCollection(rulesQuestionnaireCollectionName, 'rulesQuestionnaire');
    cy.setPermission(
      SpecialRoleName.VISITOR,
      PermissionCategory.APPLICATION,
      applicationPrivilege.NONE,
    );
    cy.setPermission(SpecialRoleName.VISITOR, PermissionCategory.RULES, rulesPrivilege.READ);
  });

  beforeEach(() => {
    cy.visit('/');
  });

  context('when signed out', () => {
    it('should see the join flow as a visitor', () => {
      // Click join button in home
      cy.dataCy('join').click();

      // Test join page
      cy.main().should('contain.text', 'Rejoindre le Valhabba');
      cy.dataCy('signin').should('have.length', 2);

      // Test rules page
      cy.dataCy('Règlement-nav-item').click();
      cy.main().should('contain.text', 'Préambule').and('not.contain.text', 'Finis de lire');
      cy.main().dataCy('next').click();
      cy.dataCy('next').click();
      cy.dataCy('next').click();
      cy.main().should('contain.text', 'Toute action PvP');
      cy.dataCy('signin').should('exist');

      // Test application page
      cy.dataCy('Candidatures-nav-item').should('not.exist');
    });
  });

  context('when signed in as non member', () => {
    before(() => {
      cy.setUserRoles([]);
      cy.login();
    });

    it('should be able to use the join flow to apply', () => {
      cy.dataCy('Candidatures-nav-item').should('not.exist');

      // Click join button in home
      cy.dataCy('join').click();

      // Test join page
      cy.main().should('contain.text', 'Lire notre règlement');
      cy.dataCy('signin').should('not.exist');
      cy.dataCy('go-to-rules').click();

      // Test rules page
      cy.dataCy('Règlement-nav-item').click();
      cy.main().should('contain.text', 'Finis de lire');
      cy.main().dataCy('next').click();
      cy.dataCy('next').click();
      cy.dataCy('next').click();
      cy.dataCy('signin').should('not.exist');
      cy.dataCy('write-application').click();

      // Test application page
      cy.main().should('contain.text', 'Ma candidature');
      cy.dataCy('nameInGame', 'input').type('Name in game');
      cy.dataCy('steamName', 'input').type('Steam name');
      cy.dataCy('steamID', 'input').type('Steam id');
      cy.dataCy('whereDidYouFindTheServer', 'textarea').type('I found the server...');
      cy.dataCy('whyDidYouChooseThisServer', 'textarea').type('I chose this server...');
      cy.dataCy('whatAreYourPlansAsAViking', 'textarea').type('I plan to...');
      cy.dataCy('background', 'textarea').type('I was a Viking...');
      cy.dataCy('submit', 'button').click();

      // See my application
      if (Cypress.env('ENV') !== 'CI')
        // TOFIX: bugs in CI
        cy.get('body').should('contain.text', 'Votre candidature a bien été enregistrée !');
      cy.dataCy('Ma candidature-nav-item').should('exist');
      cy.main()
        .should(
          'contain.text',
          'Name in game (TestUser)Quel sera le nom de ton viking ?Name in gameQuel est ton pseudo steam ?Steam nameTon ID steam :Steam idOù as-tu connu le serveur ?I found the server...Pourquoi avoir choisi de jouer sur notre serveur ?I chose this server...Quels sont tes projets en tant que Viking ?I plan to...Ton background (RP) :I was a Viking...',
        )
        .and('contain.text', 'clique ici pour répondre au questionnaire');
      cy.dataCy('discord-invite', 'a').should('not.exist');
      cy.dataCy('discord-make-appointment', 'a').should('not.exist');

      // Edit application
      cy.dataCy('edit').click();
      cy.main().should('contain.text', 'Modifier ma candidature');
      cy.dataCy('nameInGame', 'input').should('have.value', 'Name in game').type('2');
      cy.dataCy('submit', 'button').click();
      cy.get('body').should('contain.text', 'Votre candidature a bien été modifiée');
      cy.main().should('contain.text', 'Name in game2');

      // Fill questionnaire
      cy.contains('clique ici pour répondre au questionnaire').click();
      cy.dataCy('submit').should('be.disabled');
      cy.main().should(
        'contain.text',
        'Valider mes réponsesTu dois répondre à toutes les questions.',
      );
      cy.main()
        .find('textarea, input:not([type=checkbox],[type=radio])')
        .each(input => {
          cy.wrap(input).type('Answer');
        });
      cy.main()
        .find('input[type=checkbox], input[type=radio]')
        .each(checkbox => {
          cy.wrap(checkbox).closest('label').click();
        });
      cy.main().should('contain.text', 'Enregistrement...');
      cy.dataCy('submit').should('be.disabled');
      cy.main().should(
        'contain.text',
        'Valider mes réponsesTu ne pourras plus modifier tes réponses.',
      );
      cy.intercept('PATCH', '/api/applications/me').as('submitQuestionnaire');
      cy.dataCy('submit').click();
      cy.wait('@submitQuestionnaire');

      // See my application with filled questionnaire
      cy.contains('a', 'Voir mes réponses', { timeout: 5000 }).click();
      cy.dataCy('questionnaire-modal')
        .should('contain.text', 'Mon questionnaire')
        .and('contain.text', 'Answer');
      cy.dataCy('questionnaire-modal').dataCy('close-modal', 'button').click();
      cy.dataCy('questionnaire-modal').should('not.exist');
      cy.dataCy('discord-invite', 'a').should('exist');
      cy.dataCy('discord-make-appointment', 'a').should('exist');

      // Still see the join link on home
      cy.dataCy('Skali-nav-item').click();
      cy.dataCy('join').should('exist');

      // Use "My application" nav item
      cy.dataCy('Candidatures-nav-item').should('not.exist');
      cy.dataCy('Ma candidature-nav-item').click();

      // Delete application
      cy.dataCy('edit').click();
      cy.main().should('contain.text', 'Modifier ma candidature');
      cy.dataCy('delete').click();
      cy.main().should('contain.text', 'Êtes-vous sûr de vouloir supprimer');
      cy.dataCy('confirm-delete').click();
      cy.get('body').should('contain.text', 'Votre candidature a bien été supprimée');
      cy.main().should('contain.text', 'Bienvenue');
    });
  });

  context('when signed in as member with an accepted application', () => {
    before(() => {
      cy.task('seedCollection', {
        collectionName: 'applications',
        data: [
          {
            _id: 'abb0935d99a9ab9e2caaa9f1',
            userId: '6330935d99a9ab9e2caaa9fe',
            comments: [],
            applicationFormAnswer: {},
            status: ApplicationStatus.PROMOTED,
            createdAt: '',
          },
        ],
      });
      cy.setUserRoles([SpecialRoleName.MEMBER]);
      cy.login();
    });

    it('should not see the join flow', () => {
      cy.dataCy('join').should('not.exist');
      cy.dataCy('Ma candidature-nav-item').should('not.exist');
    });
  });
});
