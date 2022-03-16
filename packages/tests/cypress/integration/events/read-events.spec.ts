import { PermissionPrivilege, SpecialRoleName } from '@packages/utils/auth';
import * as Action from './action';
import * as Assert from './assert';

describe('events with read permission', () => {
  before(() => {
    cy.seedCollection('events', 'events');
  });

  beforeEach(() => {
    Action.visitEventsPage();
  });

  context('as visitor without read permission', () => {
    before(() => {
      Action.setVisitorEventPermission(PermissionPrivilege.NONE);
    });

    it('should not display events', () => {
      Assert.noEvents();
    });
  });

  context('as visitor with read permission', () => {
    before(() => {
      Action.setVisitorEventPermission(PermissionPrivilege.READ);
    });

    it('should display read only events', () => {
      Assert.readOnlyEvents();
    });
  });

  context('as member with read permission', () => {
    before(() => {
      Action.setVisitorEventPermission(PermissionPrivilege.NONE);
      Action.setMemberEventPermission(PermissionPrivilege.READ);
      cy.setUserRoles([SpecialRoleName.MEMBER]);
      cy.login();
    });

    it('should display read only events', () => {
      Assert.readOnlyEvents();
    });
  });
});
