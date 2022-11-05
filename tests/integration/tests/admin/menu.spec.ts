import { SpecialRoleName } from 'data/role';
import { PermissionCategory, rolePrivilege, userPrivilege } from 'utils/permissions';
import { AdminNavRoute, getRoute, MenuRoute, ROUTES_TO_LABEL } from 'utils/routes';

describe('menu', () => {
  beforeEach(() => {
    cy.setUserRoles([SpecialRoleName.MEMBER]);
    cy.login();
  });

  it('should see users navigation buttons', () => {
    cy.setPermission(SpecialRoleName.MEMBER, PermissionCategory.USER, userPrivilege.READ);
    cy.visit(getRoute(MenuRoute.ADMIN));
    cy.dataCy('admin-nav').dataCy(ROUTES_TO_LABEL[AdminNavRoute.MEMBERS]).should('be.visible');
    cy.dataCy('admin-nav').dataCy(ROUTES_TO_LABEL[AdminNavRoute.NON_MEMBERS]).should('be.visible');
  });

  it('should see role navigation button', () => {
    cy.setPermission(SpecialRoleName.MEMBER, PermissionCategory.ROLE, rolePrivilege.READ);
    cy.visit(getRoute(MenuRoute.ADMIN));
    cy.dataCy('admin-nav').dataCy(ROUTES_TO_LABEL[AdminNavRoute.ROLES]).should('be.visible');
  });
});
