import { SpecialRoleName } from 'data/role';
import { PermissionCategory, PermissionPrivilege } from 'utils/permissions';
import { APIRoute, getRoute, NavRoute } from 'utils/routes';

export const seedEvents = () => cy.seedCollection('events', 'events');

export const setVisitorEventPermission = (
  permissionPrivilege: PermissionPrivilege<PermissionCategory.EVENT>,
) => cy.setPermission(SpecialRoleName.VISITOR, PermissionCategory.EVENT, permissionPrivilege);

export const setMemberEventPermission = (
  permissionPrivilege: PermissionPrivilege<PermissionCategory.EVENT>,
) => cy.setPermission(SpecialRoleName.MEMBER, PermissionCategory.EVENT, permissionPrivilege);

export const visitEventsPage = (eventId?: string) => {
  const queryParams = eventId ? `?id=${eventId}` : '';
  cy.visit(`${getRoute(NavRoute.EVENTS)}${queryParams}`);
};

export const visitEventsPageAndWaitFor = (routeStartToWaitFor: APIRoute, eventId?: string) => {
  const routeToWaitFor = `${routeStartToWaitFor}*`;
  cy.intercept(routeToWaitFor).as(routeToWaitFor);
  cy.visit(getRoute(`${NavRoute.EVENTS}${eventId ? `?id=${eventId}` : ''}`));
  cy.wait(`@${routeToWaitFor}`);
};
