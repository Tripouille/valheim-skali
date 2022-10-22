import { SpecialRoleName } from 'data/role';
import { rolePrivilege, PermissionCategory } from 'utils/permissions';
import { APIRoute } from 'utils/routes';
import * as Action from './action';
import * as Select from './select';

describe('roles page', () => {
  beforeEach(() => {
    cy.seedCollection('roles', 'roles');
    cy.setUserRoles([SpecialRoleName.MEMBER]);
    cy.login();
  });

  after(() => {
    cy.setPermission(SpecialRoleName.MEMBER, PermissionCategory.ROLE, rolePrivilege.NONE);
  });

  context('with only read permission on roles', () => {
    beforeEach(() => {
      cy.setPermission(SpecialRoleName.MEMBER, PermissionCategory.ROLE, rolePrivilege.READ);
      Action.visitRolesPage();
    });

    it('should display roles and not edition tools', () => {
      cy.dataCy('admin').should('contain.text', 'Rôles');
      Select.roleLines().should('have.length', 5);
      cy.dataCy('admin').should('not.contain.text', 'SuperAdmin');
      cy.dataCy('create-role').should('not.exist');
      cy.dataCy('edit', 'button').should('not.exist');
      cy.dataCy('role-0').click();
      cy.dataCy('edit-role-modal').should('not.exist');
    });
  });

  context('with admin permission on roles', () => {
    beforeEach(() => {
      cy.setPermission(SpecialRoleName.MEMBER, PermissionCategory.ROLE, rolePrivilege.ADMIN);
      Action.visitRolesPage();
    });

    it('should display roles and edition tools', () => {
      cy.dataCy('admin').should('contain.text', 'Rôles');
      Select.roleLines().should('have.length', 5);
      cy.dataCy('edit', 'button').should('have.length', 5);
      cy.dataCy('create-role').should('be.visible');
      cy.dataCy('role-0').click();
      cy.dataCy('edit-role-modal').should('be.visible');
    });

    it('should be able to create a role without user permission', () => {
      cy.intercept('POST', APIRoute.ROLES).as('createRole');

      cy.dataCy('create-role').click();
      cy.dataCy('create-role-modal').dataCy('name', 'input').type('New role');
      Select.reqPermissionsFormSelect().should('be.enabled');
      cy.dataCy('req-permissions-help').should('not.exist');
      Select.permissionsFormOption('USER', '1_READ')
        .should('be.disabled')
        .and('contain.text', 'Doit pouvoir lire les rôles');
      Select.permissionsFormOption('USER', '2_READ_WRITE')
        .should('be.disabled')
        .and('contain.text', 'Doit pouvoir lire les rôles');
      Select.permissionsFormSelect('EVENT').select('1_READ');

      cy.dataCy('create-role-modal').dataCy('submit', 'button').click();
      cy.wait('@createRole').should(xhr => {
        expect(xhr.response?.statusCode).to.eq(201);
        expect(xhr.request.body).to.eql({
          name: 'New role',
          permissions: { EVENT: '1_READ' },
          requiredPermissionsToAssign: { USER: '2_READ_WRITE' },
        });
      });
      Select.roleLines().should('have.length', 6).and('contain', 'New role');
    });

    it('should be able to create a role with user write permission', () => {
      cy.intercept('POST', APIRoute.ROLES).as('createRole');

      cy.dataCy('create-role').click();
      cy.dataCy('create-role-modal').dataCy('name', 'input').type('New role');
      Select.permissionsFormSelect('ROLE').select('1_READ');
      Select.permissionsFormSelect('USER').select('2_READ_WRITE');
      Select.reqPermissionsFormSelect().should('be.disabled');
      cy.dataCy('req-permissions-help').should('be.visible');
      cy.dataCy('req-permissions-help').trigger('mouseover');
      cy.get('body').should('contain.text', 'Le rôle Admin est obligatoire');
      Select.permissionsFormSelect('EVENT').select('2_READ_WRITE');

      cy.dataCy('create-role-modal').dataCy('submit', 'button').click();
      cy.wait('@createRole').should(xhr => {
        expect(xhr.response?.statusCode).to.eq(201);
        expect(xhr.request.body).to.eql({
          name: 'New role',
          permissions: { ROLE: '1_READ', USER: '2_READ_WRITE', EVENT: '2_READ_WRITE' },
          requiredPermissionsToAssign: { USER: '3_ADMIN' },
        });
      });
      Select.roleLines().should('have.length', 6).and('contain', 'New role');
    });

    it('should be able to edit a role', () => {
      cy.intercept('PUT', `${APIRoute.ROLES}/*`).as('updateRole');

      Select.roleLines().should('have.length', 5);
      cy.dataCy('role-2').dataCy('edit', 'button').click();
      cy.dataCy('edit-role-modal').dataCy('name', 'input').should('have.value', 'Modo').type('2');
      Select.permissionsFormSelect('USER').select('1_READ');
      Select.reqPermissionsFormSelect().select('2_READ_WRITE');

      cy.dataCy('edit-role-modal').dataCy('submit', 'button').click();
      cy.wait('@updateRole').should(xhr => {
        expect(xhr.response?.statusCode).to.eq(200);
        expect(xhr.request.body).to.eql({
          name: 'Modo2',
          permissions: { ROLE: '1_READ', USER: '1_READ', EVENT: '2_READ_WRITE' },
          requiredPermissionsToAssign: { USER: '2_READ_WRITE' },
        });
      });
      Select.roleLines().should('have.length', 5).and('contain', 'Modo2');
    });

    it('should be able to delete a role', () => {
      cy.intercept('DELETE', `${APIRoute.ROLES}/*`).as('deleteRole');

      cy.dataCy('role-1').dataCy('edit', 'button').click();
      cy.dataCy('edit-role-modal').dataCy('delete', 'button').click();
      cy.dataCy('edit-role-modal').dataCy('confirm-delete', 'button').click();
      cy.wait('@deleteRole').its('response.statusCode').should('eq', 200);
      Select.roleLines().should('have.length', 4);
    });

    it('should not be able to edit admin role', () => {
      cy.contains(SpecialRoleName.ADMIN).closest('tr').dataCy('edit', 'button').click();
      cy.dataCy('edit-role-modal').find('input:enabled').should('not.exist');
      cy.dataCy('edit-role-modal').find('select:enabled').should('not.exist');
      cy.dataCy('edit-role-modal').dataCy('submit', 'button').should('not.exist');
      cy.dataCy('edit-role-modal').dataCy('delete', 'button').should('not.exist');
    });

    it('should be able to partially edit visitor role', () => {
      cy.intercept('PUT', `${APIRoute.ROLES}/*`).as('updateRole');

      cy.contains(SpecialRoleName.VISITOR).closest('tr').dataCy('edit', 'button').click();
      cy.dataCy('edit-role-modal').find('input:enabled').should('not.exist');
      cy.dataCy('edit-role-modal').dataCy('delete', 'button').should('not.exist');
      cy.dataCy('req-permissions-form').should('not.exist');
      Select.permissionsFormSelect('ROLE').select('1_READ');

      cy.dataCy('edit-role-modal').dataCy('submit', 'button').click();
      cy.wait('@updateRole').its('response.statusCode').should('eq', 200);
      cy.dataCy('edit-role-modal').dataCy('close-modal', 'button').click();
      cy.dataCy('edit-role-modal').should('not.exist');
      cy.contains(SpecialRoleName.VISITOR)
        .closest('tr')
        .contains('Rôles')
        .closest('tr')
        .contains('Voir');
    });

    it('should be able to partially edit viking role', () => {
      cy.contains(SpecialRoleName.MEMBER).closest('tr').dataCy('edit', 'button').click();
      cy.dataCy('edit-role-modal').find('input:enabled').should('not.exist');
      cy.dataCy('edit-role-modal').dataCy('delete', 'button').should('not.exist');
      Select.permissionsFormSelect('ROLE').select('1_READ');
      Select.reqPermissionsFormSelect().select('3_ADMIN');
      cy.dataCy('edit-role-modal').dataCy('submit', 'button').should('be.enabled');
    });
  });
});
