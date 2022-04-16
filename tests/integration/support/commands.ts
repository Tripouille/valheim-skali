import { PermissionCategory, PermissionPrivilege, SpecialRoleName } from 'utils/auth';

Cypress.Commands.add('dataCy', value => cy.get(`[data-cy=${value}]`));
Cypress.Commands.add('main', () => cy.get('main'));

const sessionCookieName = 'next-auth.session-token';

Cypress.Commands.add('login', () => {
  cy.setCookie(sessionCookieName, Cypress.env('TEST_SESSION_TOKEN'));
});

Cypress.Commands.add('seedCollection', <T>(collectionName: string, fixtureFileName: string) => {
  cy.fixture<Array<T>>(fixtureFileName).then(data =>
    cy.task('seedCollection', { collectionName, data }),
  );
});

Cypress.Commands.add(
  'setPermission',
  (
    roleName: string,
    permissionCategory: PermissionCategory,
    permissionPrivilege: PermissionPrivilege,
  ) => {
    cy.task('setPermission', { roleName, permissionCategory, permissionPrivilege });
  },
);

Cypress.Commands.add('setUserRoles', (roleNames: SpecialRoleName[]) => {
  cy.task('setUserRoles', roleNames);
});
