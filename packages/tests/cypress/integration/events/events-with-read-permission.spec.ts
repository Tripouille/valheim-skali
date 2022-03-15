import { APIRoute } from '../../../../utils/routes';

describe('events with read permission', () => {
  before(() => {
    cy.seedCollection('events', 'events');
    cy.seedCollection('roles', 'roles');
  });

  beforeEach(() => {
    cy.intercept(APIRoute.SESSION).as('session');
    cy.intercept(APIRoute.VISITOR).as('visitor');
    cy.intercept(APIRoute.EVENTS).as('getEvents');
    cy.visit('/valhabba/events');
    cy.wait(['@session', '@visitor', '@getEvents']);
  });

  context('as visitor', () => {
    before(() => {
      cy.logout();
    });

    it('should display events and not edition tools', () => {
      cy.get('main').contains('Événements').should('be.visible');
      cy.dataCy('event-0-card')
        .should('contain', 'Event1')
        .and('contain', 'Lien discord')
        .and('contain', 'Tag1')
        .and('contain', 'Tag2')
        .and('contain', 'Le samedi 2 janvier 2100, 20:30')
        .and('contain', 'Une description 1');
      cy.dataCy('event-1-card')
        .should('contain', 'Event2 (terminé)')
        .and('not.contain', 'Lien discord')
        .and('contain', 'Une description 2');
      cy.dataCy('event-create-button').should('not.exist');
      cy.dataCy('event-0-edit-button').should('not.exist');
    });
  });
});
