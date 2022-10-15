import { SpecialRoleName } from 'data/role';
import { applicationPrivilege, PermissionCategory, rulesPrivilege } from 'utils/permissions';

describe('application as candidate', () => {
  before(() => {
    cy.task('seedCollection', { collectionName: 'applications', data: [] });
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
      cy.dataCy('applications').should('not.exist');
    });
  });

  context('when signed in as non member with no application', () => {
    before(() => {
      cy.setUserRoles([]);
      cy.login();
    });

    it.only('should see the join flow and apply', () => {
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
      cy.get('body').should('contain.text', 'Votre candidature a bien été enregistrée !');
      cy.main()
        .should('contain.text', "En attente d'un entretien")
        .and(
          'contain.text',
          "Name in game (TestUser)En attente d'un entretienQuel sera le nom de ton viking ?Name in gameQuel est ton pseudo steam ?Steam nameTon ID steam :Steam idOù as-tu connu le serveur ?I found the server...Pourquoi avoir choisi de jouer sur notre serveur ?I chose this server...Quels sont tes projets en tant que Viking ?I plan to...Ton background (RP) :I was a Viking...",
        );

      // Edit application
      cy.dataCy('edit').click();
      cy.main().should('contain.text', 'Modifier ma candidature');
      cy.dataCy('nameInGame', 'input').should('have.value', 'Name in game').type('2');
      cy.dataCy('submit', 'button').click();
      cy.get('body').should('contain.text', 'Votre candidature a bien été modifiée');
      cy.main()
        .should('contain.text', "En attente d'un entretien")
        .and('contain.text', 'Name in game2');

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
});
