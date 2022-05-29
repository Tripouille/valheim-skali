import { SpecialRoleName } from 'data/role';
import { eventPrivilege } from 'utils/permissions';
import { APIRoute } from 'utils/routes';
import * as Action from './action';
import * as Select from './select';

describe('events with read permission', () => {
  before(() => {
    cy.seedCollection('events', 'events');
  });

  context('as visitor without read permission', () => {
    before(() => {
      Action.setVisitorEventPermission(eventPrivilege.NONE);
      Action.visitEventsPageAndWaitFor(APIRoute.VISITOR);
    });

    it('should not display events', () => {
      Select.eventCards().should('not.exist');
      cy.dataCy('events').should('not.exist');
      cy.dataCy('create-event').should('not.exist');
      cy.dataCy('edit', 'button').should('not.exist');
    });
  });

  context('as visitor with read permission', () => {
    before(() => {
      Action.setVisitorEventPermission(eventPrivilege.READ);
    });

    it('should display events but not edition tools', () => {
      Action.visitEventsPageAndWaitFor(APIRoute.EVENTS);
      cy.main().contains('Événements').should('be.visible');
      Select.eventCards().should('have.length', 2);
      Select.createEventButton().should('not.exist');
      Select.editEventButton(0).should('not.exist');
    });

    it('should open event modal when visiting events with id', () => {
      Action.visitEventsPageAndWaitFor(APIRoute.EVENTS, '6228cb385f506b78affc05f2');
      cy.dataCy('event-1-modal').should('be.visible');
    });
  });

  context('as member with read permission', () => {
    before(() => {
      Action.setVisitorEventPermission(eventPrivilege.NONE);
      Action.setMemberEventPermission(eventPrivilege.READ);
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
