import { SpecialRoleName } from 'data/role';
import { PermissionCategory, rolePrivilege, userPrivilege, wikiPrivilege } from 'utils/permissions';

describe('aside menu', () => {
  context('when signed out', () => {
    before(() => {
      cy.setPermission(SpecialRoleName.VISITOR, PermissionCategory.USER, userPrivilege.NONE);
      cy.setPermission(SpecialRoleName.VISITOR, PermissionCategory.ROLE, rolePrivilege.NONE);
      cy.setPermission(SpecialRoleName.VISITOR, PermissionCategory.WIKI, wikiPrivilege.NONE);
    });

    beforeEach(() => {
      cy.visit('/');
    });

    it('should be able to sign in', () => {
      cy.dataCy('nav-bar').dataCy('menu', 'button').click();
      cy.dataCy('nav-bar').dataCy('sign-in-out').should('be.visible');
    });

    it('should see the about link', () => {
      cy.dataCy('nav-bar').dataCy('menu', 'button').click();
      cy.dataCy('nav-bar').dataCy('about').should('be.visible');
    });

    it('should not see the admin link', () => {
      cy.dataCy('nav-bar').dataCy('menu', 'button').click();
      cy.dataCy('nav-bar').dataCy('admin').should('not.exist');
    });
  });

  context('when signed in with no role', () => {
    before(() => {
      cy.setUserRoles([]);
    });

    beforeEach(() => {
      cy.login();
      cy.visit('/');
    });

    it('should be able to sign out', () => {
      cy.dataCy('nav-bar').dataCy('menu', 'button').click();
      cy.dataCy('nav-bar').dataCy('sign-in-out').should('be.visible');
    });

    it('should not see the admin link', () => {
      cy.dataCy('nav-bar').dataCy('menu', 'button').click();
      cy.dataCy('nav-bar').dataCy('admin').should('not.exist');
    });
  });
});

context('when signed in as user with user read permission', () => {
  before(() => {
    cy.setPermission(SpecialRoleName.MEMBER, PermissionCategory.ROLE, rolePrivilege.NONE);
    cy.setPermission(SpecialRoleName.MEMBER, PermissionCategory.USER, userPrivilege.READ);
    cy.setUserRoles([SpecialRoleName.MEMBER]);
  });

  beforeEach(() => {
    cy.login();
    cy.visit('/');
  });

  it('should be able to sign out', () => {
    cy.dataCy('nav-bar').dataCy('menu', 'button').click();
    cy.dataCy('nav-bar').dataCy('sign-in-out').should('be.visible');
  });

  it('should see the admin link', () => {
    cy.dataCy('nav-bar').dataCy('menu', 'button').click();
    cy.dataCy('nav-bar').dataCy('admin').should('be.visible');
  });
});

context('when signed in as user with wiki propose permission only', () => {
  before(() => {
    cy.setPermission(SpecialRoleName.MEMBER, PermissionCategory.ROLE, rolePrivilege.NONE);
    cy.setPermission(SpecialRoleName.MEMBER, PermissionCategory.USER, userPrivilege.NONE);
    cy.setPermission(SpecialRoleName.MEMBER, PermissionCategory.WIKI, wikiPrivilege.PROPOSE);
    cy.setUserRoles([SpecialRoleName.MEMBER]);
  });

  beforeEach(() => {
    cy.login();
    cy.visit('/');
  });

  it('should not see the admin link', () => {
    cy.dataCy('nav-bar').dataCy('menu', 'button').click();
    cy.dataCy('nav-bar').dataCy('admin').should('not.exist');
  });
});

context('when signed in as user with wiki write permission only', () => {
  before(() => {
    cy.setPermission(SpecialRoleName.MEMBER, PermissionCategory.ROLE, rolePrivilege.NONE);
    cy.setPermission(SpecialRoleName.MEMBER, PermissionCategory.USER, userPrivilege.NONE);
    cy.setPermission(SpecialRoleName.MEMBER, PermissionCategory.WIKI, wikiPrivilege.WRITE);
    cy.setUserRoles([SpecialRoleName.MEMBER]);
  });

  beforeEach(() => {
    cy.login();
    cy.visit('/');
  });

  it('should see the admin link', () => {
    cy.dataCy('nav-bar').dataCy('menu', 'button').click();
    cy.dataCy('nav-bar').dataCy('admin').should('be.visible');
  });
});
