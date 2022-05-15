import { PermissionCategory, PermissionPrivilege, SpecialRoleName } from 'utils/auth';
import { MenuRoute, ROUTES_TO_LABEL, serverName } from 'utils/routes';

describe('menu', () => {
  beforeEach(() => {
    cy.setUserRoles([SpecialRoleName.MEMBER]);
    cy.login();
  });

  it('should see users navigation buttons', () => {
    cy.setPermission(SpecialRoleName.MEMBER, PermissionCategory.USER, PermissionPrivilege.READ);
    cy.visit(`/${serverName}${MenuRoute.ADMIN}`);
    cy.dataCy('admin-nav').dataCy(ROUTES_TO_LABEL['/members']).should('be.visible');
    cy.dataCy('admin-nav').dataCy(ROUTES_TO_LABEL['/non-members']).should('be.visible');
  });

  it('should see role navigation button', () => {
    cy.setPermission(SpecialRoleName.MEMBER, PermissionCategory.ROLE, PermissionPrivilege.READ);
    cy.visit(`/${serverName}${MenuRoute.ADMIN}`);
    cy.dataCy('admin-nav').dataCy(ROUTES_TO_LABEL['/roles']).should('be.visible');
  });
});
