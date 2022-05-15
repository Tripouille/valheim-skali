import { PermissionCategory, PermissionPrivilege, SpecialRoleName } from 'utils/auth';

describe('menu', () => {
  context('when signed out', () => {
    before(() => {
      cy.setPermission(SpecialRoleName.VISITOR, PermissionCategory.USER, PermissionPrivilege.NONE);
      cy.setPermission(SpecialRoleName.VISITOR, PermissionCategory.ROLE, PermissionPrivilege.NONE);
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

  context('when signed in as simple user', () => {
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
    cy.setPermission(SpecialRoleName.MEMBER, PermissionCategory.ROLE, PermissionPrivilege.NONE);
    cy.setPermission(SpecialRoleName.MEMBER, PermissionCategory.USER, PermissionPrivilege.READ);
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
