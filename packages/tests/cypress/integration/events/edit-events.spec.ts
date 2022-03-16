import { PermissionPrivilege, SpecialRoleName } from '@packages/utils/auth';
import * as Action from './action';
import * as Assert from './assert';

describe('events with edit permission', () => {
  before(() => {
    Action.seedEvents();
    Action.setMemberEventPermission(PermissionPrivilege.READ_WRITE);
    cy.setUserRoles([SpecialRoleName.MEMBER]);
    cy.login();
  });

  beforeEach(() => {
    Action.visitEventsPage();
  });

  it('should be able to create, edit and delete events', () => {
    Assert.canCreateEvents();
    Assert.canEditEvent();
    Assert.canDeleteEvent();
  });
});
