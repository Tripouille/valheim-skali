import { SpecialRoleName } from 'data/role';
import { PermissionCategory, Permissions } from 'utils/permissions';

Cypress.Commands.add('dataCy', { prevSubject: 'optional' }, (subject, value, selector = '') => {
  if (subject)
    return (subject as Cypress.Chainable<JQuery<HTMLElement>>).find(
      `${selector}[data-cy="${value}"]`,
    );
  return cy.get(`${selector}[data-cy="${value}"]`);
});

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
  <C extends PermissionCategory>(
    roleName: string,
    permissionCategory: C,
    permissionPrivilege: Permissions[C],
  ) => {
    cy.task('setPermission', { roleName, permissionCategory, permissionPrivilege });
  },
);

Cypress.Commands.add('setUserRoles', (roleNames: SpecialRoleName[]) => {
  cy.task('setUserRoles', roleNames);
});
