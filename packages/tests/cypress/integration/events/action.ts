import { PermissionCategory, PermissionPrivilege, SpecialRoleName } from '@packages/utils/auth';
import { APIRoute, NavRoute, serverName } from '@packages/utils/routes';

export const seedEvents = () => cy.seedCollection('events', 'events');

export const setVisitorEventPermission = (permissionPrivilege: PermissionPrivilege) =>
  cy.setPermission(SpecialRoleName.VISITOR, PermissionCategory.EVENT, permissionPrivilege);

export const setMemberEventPermission = (permissionPrivilege: PermissionPrivilege) =>
  cy.setPermission(SpecialRoleName.MEMBER, PermissionCategory.EVENT, permissionPrivilege);

export const visitEventsPage = (waitForGetEvents = true) => {
  cy.intercept(APIRoute.SESSION).as('session');
  cy.intercept(APIRoute.VISITOR).as('visitor');
  cy.intercept(APIRoute.EVENTS).as('getEvents');
  cy.visit(`/${serverName}${NavRoute.EVENTS}`);
  cy.wait(['@session', '@visitor', ...(waitForGetEvents ? ['@getEvents'] : [])]);
};
