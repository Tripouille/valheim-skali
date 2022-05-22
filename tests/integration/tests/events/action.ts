import { PermissionCategory, PermissionPrivilege, SpecialRoleName } from 'utils/auth';
import { APIRoute, NavRoute, serverName } from 'utils/routes';

export const seedEvents = () => cy.seedCollection('events', 'events');

export const setVisitorEventPermission = (permissionPrivilege: PermissionPrivilege) =>
  cy.setPermission(SpecialRoleName.VISITOR, PermissionCategory.EVENT, permissionPrivilege);

export const setMemberEventPermission = (permissionPrivilege: PermissionPrivilege) =>
  cy.setPermission(SpecialRoleName.MEMBER, PermissionCategory.EVENT, permissionPrivilege);

export const visitEventsPageAndWaitFor = (routeToWaitFor: APIRoute, eventId?: string) => {
  cy.intercept(routeToWaitFor).as(routeToWaitFor);
  cy.visit(`/${serverName}${NavRoute.EVENTS}${eventId ? `?id=${eventId}` : ''}`);
  cy.wait(`@${routeToWaitFor}`);
};
