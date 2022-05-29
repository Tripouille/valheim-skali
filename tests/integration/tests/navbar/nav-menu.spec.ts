import { SpecialRoleName } from 'data/role';
import { eventPrivilege, PermissionCategory } from 'utils/permissions';

describe('nav menu', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should be able to visit rules page', () => {
    cy.dataCy('nav-bar').dataCy('Règlement-nav-item').click();
    cy.get('main', { timeout: 1500 }).should('contain.text', 'Règlement');
  });

  context('without event permission', () => {
    before(() => {
      cy.setPermission(SpecialRoleName.VISITOR, PermissionCategory.EVENT, eventPrivilege.NONE);
    });

    // TOFIX for ci
    it.skip('should not see events link', () => {
      cy.dataCy('nav-bar').dataCy('Skali-nav-item').should('be.visible');
      cy.dataCy('nav-bar').dataCy('Événements-nav-item').should('not.exist');
    });
  });

  context('with event permission', () => {
    before(() => {
      cy.setPermission(SpecialRoleName.VISITOR, PermissionCategory.EVENT, eventPrivilege.READ);
    });

    it('should be able to visit events page', () => {
      cy.dataCy('nav-bar').dataCy('Événements-nav-item').click();
      cy.get('main', { timeout: 2000 }).should('contain.text', 'Événements');
    });
  });
});
