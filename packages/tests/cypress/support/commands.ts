import { PermissionCategory, PermissionPrivilege, SpecialRoleName } from '@packages/utils/auth';

Cypress.Commands.add('dataCy', value => cy.get(`[data-cy=${value}]`));
Cypress.Commands.add('dataCyLike', value => cy.get(`[data-cy*=${value}]`));

const sessionCookieName = 'next-auth.session-token';

Cypress.Commands.add('login', (userType?: 'super_admin') => {
  cy.setCookie(
    sessionCookieName,
    Cypress.env(userType === 'super_admin' ? 'SUPER_ADMIN_SESSION_TOKEN' : 'TEST_SESSION_TOKEN'),
  );
  // Cypress.Cookies.preserveOnce(sessionCookieName);
});

Cypress.Commands.add('logout', () => {
  cy.clearCookie(sessionCookieName);
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
