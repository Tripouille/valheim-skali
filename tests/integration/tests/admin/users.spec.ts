import { SpecialRoleName } from 'data/role';
import { PermissionCategory, rolePrivilege, userPrivilege } from 'utils/permissions';
import { AdminNavRoute, APIRoute } from 'utils/routes';
import * as Action from './action';
import * as Select from './select';

describe('users pages', () => {
  beforeEach(() => {
    cy.seedCollection('roles', 'roles');
    cy.seedCollection('users', 'users');
    cy.setUserRoles([SpecialRoleName.MEMBER]);
    cy.setPermission(SpecialRoleName.MEMBER, PermissionCategory.ROLE, rolePrivilege.READ);
    cy.login();
  });

  context('with only read permission', () => {
    beforeEach(() => {
      cy.setPermission(SpecialRoleName.MEMBER, PermissionCategory.USER, userPrivilege.READ);
    });

    describe('members page', () => {
      beforeEach(() => {
        Action.visitUsersPage(AdminNavRoute.MEMBERS);
      });

      it('should display members and not edition tools', () => {
        cy.dataCy('admin').should('contain.text', 'Vikings');
        Select.usersLines().should('have.length', 4);
        cy.dataCy('edit', 'button').should('not.exist');
        cy.dataCy('admin').should('not.contain.text', SpecialRoleName.SUPER_ADMIN);
        cy.dataCy('user-0').click();
        cy.dataCy('roles-form').dataCy('close').should('not.exist');
        cy.dataCy('roles-form').should('contain.text', SpecialRoleName.MEMBER);
        cy.dataCy('edit-user-modal').should('contain.text', 'TestUser name in game');
        cy.dataCy('name-in-game').should('not.exist');
        cy.dataCy('add-role', 'button').should('not.exist');
        cy.dataCy('delete', 'button').should('not.exist');
      });
    });

    describe('non members page', () => {
      beforeEach(() => {
        Action.visitUsersPage(AdminNavRoute.NON_MEMBERS);
      });

      it('should display non members and not edition tools', () => {
        cy.dataCy('admin').should('contain.text', 'Âmes perdues');
        Select.usersLines().should('have.length', 1);
        cy.dataCy('edit', 'button').should('not.exist');
        cy.dataCy('promote', 'button').should('not.exist');
        cy.dataCy('user-0').click();
        cy.dataCy('edit-user-modal').should('contain.text', 'Aucun rôle');
        cy.dataCy('edit-user-modal').should('contain.text', 'User1 name in game');
        cy.dataCy('name-in-game').should('not.exist');
        cy.dataCy('add-role', 'button').should('not.exist');
        cy.dataCy('delete', 'button').should('not.exist');
      });
    });
  });

  context('with read and write permission', () => {
    beforeEach(() => {
      cy.setPermission(SpecialRoleName.MEMBER, PermissionCategory.USER, userPrivilege.READ_WRITE);
    });

    describe('members page', () => {
      beforeEach(() => {
        Action.visitUsersPage(AdminNavRoute.MEMBERS);
      });

      it('should display members and edition tools', () => {
        cy.dataCy('admin').should('contain.text', 'Vikings');
        Select.usersLines().should('have.length', 4);
        cy.dataCy('edit', 'button').should('have.length', 4);
      });

      it('should be able to change a user name in game', () => {
        cy.intercept('PATCH', `${APIRoute.USERS}/*`).as('updateUser');

        cy.dataCy('user-0').dataCy('edit', 'button').click();
        cy.dataCy('name-in-game').find('button').click();
        cy.dataCy('name-in-game').find('input').type('New name in game').blur();

        cy.wait('@updateUser').its('response.statusCode').should('eq', 200);
        Select.usersLines().should('have.length', 4).and('contain', 'New name in game');
      });

      it('should be able to add a role to a user', () => {
        cy.intercept('PATCH', `${APIRoute.USERS}/**`).as('updateUser');

        cy.dataCy('user-0').dataCy('edit', 'button').click();
        cy.dataCy('add-role', 'button').click();
        cy.dataCy('add-role-Event redactor', 'button').click();

        cy.wait('@updateUser').its('response.statusCode').should('eq', 200);
        Select.usersLines().should('contain', 'Event redactor');
      });

      it('should be able to remove a role from a user', () => {
        cy.intercept('PATCH', `${APIRoute.USERS}/**`).as('updateUser');

        cy.dataCy('user-1').dataCy('edit', 'button').click();
        cy.dataCy('roles-form').dataCy('close', 'button').click();

        cy.wait('@updateUser').its('response.statusCode').should('eq', 200);
        Select.usersLines().should('not.contain', 'User2');
      });

      it('should be able to delete a user', () => {
        cy.intercept('DELETE', `${APIRoute.USERS}/*`).as('deleteUser');

        cy.dataCy('user-1').dataCy('edit', 'button').click();
        cy.dataCy('edit-user-modal').dataCy('delete', 'button').click();
        cy.dataCy('edit-user-modal').dataCy('confirm-delete', 'button').click();

        cy.wait('@deleteUser').its('response.statusCode').should('eq', 200);
        Select.usersLines().should('have.length', 3);
      });

      it('should not be able to edit an admin user', () => {
        cy.dataCy('user-2').dataCy('edit', 'button').click();
        cy.dataCy('edit-user-modal').dataCy('delete', 'button').should('not.exist');
        cy.dataCy('roles-form')
          .dataCy(SpecialRoleName.ADMIN)
          .dataCy('close', 'button')
          .should('not.exist');
      });
    });

    describe('non members page', () => {
      beforeEach(() => {
        Action.visitUsersPage(AdminNavRoute.NON_MEMBERS);
      });

      it('should display non members and not edition tools', () => {
        cy.dataCy('admin').should('contain.text', 'Âmes perdues');
        Select.usersLines().should('have.length', 1);
        cy.dataCy('edit', 'button').should('be.visible');
        cy.dataCy('promote', 'button').should('be.visible');
      });

      it('should be able to promote to member', () => {
        cy.intercept('PATCH', `${APIRoute.USERS}/**`).as('updateUser');

        cy.dataCy('promote', 'button').click();

        cy.wait('@updateUser').its('response.statusCode').should('eq', 200);
        Select.usersLines().should('not.exist');
        cy.dataCy('admin').should(
          'contain.text',
          "Aucune âme ne s'est perdue aux frontières du Valhabba",
        );
      });
    });
  });
});
