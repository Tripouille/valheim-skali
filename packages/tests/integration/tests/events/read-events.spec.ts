import { PermissionPrivilege, SpecialRoleName } from '@packages/utils/auth';
import * as Action from './action';
import * as Select from './select';

describe('events with read permission', () => {
  before(() => {
    cy.seedCollection('events', 'events');
  });

  context('as visitor without read permission', () => {
    before(() => {
      Action.setVisitorEventPermission(PermissionPrivilege.NONE);
      Action.visitEventsPage(false);
    });

    it('should not display events', () => {
      Select.eventsCards().should('not.exist');
      Select.eventCreateButton().should('not.exist');
      Select.eventEditButton(0).should('not.exist');
    });
  });

  context('as visitor with read permission', () => {
    before(() => {
      Action.setVisitorEventPermission(PermissionPrivilege.READ);
      Action.visitEventsPage(false);
    });

    it('should display events but not edition tools', () => {
      cy.main().contains('Événements').should('be.visible');
      Select.eventsCards().should('have.length', 2);
      Select.eventCreateButton().should('not.exist');
      Select.eventEditButton(0).should('not.exist');
    });
  });

  context('as member with read permission', () => {
    before(() => {
      Action.setVisitorEventPermission(PermissionPrivilege.NONE);
      Action.setMemberEventPermission(PermissionPrivilege.READ);
      cy.setUserRoles([SpecialRoleName.MEMBER]);
      cy.login();
      Action.visitEventsPage();
    });

    it('should display events but not edition tools', () => {
      cy.main().contains('Événements').should('be.visible');
      Select.eventsCards().should('have.length', 2);
      Select.eventCreateButton().should('not.exist');
      Select.eventEditButton(0).should('not.exist');
    });
  });
});
