import { PermissionPrivilege, SpecialRoleName } from 'utils/auth';
import { APIRoute } from 'utils/routes';
import * as Action from './action';
import * as Select from './select';

describe('events with read permission', () => {
  before(() => {
    cy.seedCollection('events', 'events');
  });

  context('as visitor without read permission', () => {
    before(() => {
      Action.setVisitorEventPermission(PermissionPrivilege.NONE);
      Action.visitEventsPageAndWaitFor(APIRoute.VISITOR);
    });

    it('should not display events', () => {
      Select.eventCards().should('not.exist');
      cy.dataCy('events').should('not.exist');
      cy.dataCy('create-event').should('not.exist');
      cy.dataCy('edit').should('not.exist');
    });
  });

  context('as visitor with read permission', () => {
    before(() => {
      Action.setVisitorEventPermission(PermissionPrivilege.READ);
      Action.visitEventsPageAndWaitFor(APIRoute.EVENTS);
    });

    it('should display events but not edition tools', () => {
      cy.main().contains('Événements').should('be.visible');
      Select.eventCards().should('have.length', 2);
      Select.createEventButton().should('not.exist');
      Select.editEventButton(0).should('not.exist');
    });
  });

  context('as member with read permission', () => {
    before(() => {
      Action.setVisitorEventPermission(PermissionPrivilege.NONE);
      Action.setMemberEventPermission(PermissionPrivilege.READ);
      cy.setUserRoles([SpecialRoleName.MEMBER]);
      cy.login();
      Action.visitEventsPageAndWaitFor(APIRoute.EVENTS);
    });

    it('should display events but not edition tools', () => {
      cy.main().contains('Événements').should('be.visible');
      Select.eventCards().should('have.length', 2);
      Select.createEventButton().should('not.exist');
      Select.editEventButton(0).should('not.exist');
    });
  });
});
