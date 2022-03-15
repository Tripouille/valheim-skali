Cypress.Commands.add('dataCy', value => cy.get(`[data-cy=${value}]`));
Cypress.Commands.add('dataCyLike', value => cy.get(`[data-cy*=${value}]`));

Cypress.Commands.add('seedCollection', <T>(collectionName: string, fixtureFileName: string) => {
  cy.fixture<Array<T>>(fixtureFileName).then(data =>
    cy.task('seedCollection', { collectionName, data }),
  );
});

Cypress.Commands.add('login', (userType?: 'super_admin') => {
  cy.setCookie(
    'next-auth.session-token',
    Cypress.env(userType === 'super_admin' ? 'SUPER_ADMIN_SESSION_TOKEN' : 'TEST_SESSION_TOKEN'),
  );

  // Cypress.Cookies.preserveOnce('next-auth.session-token');
});

Cypress.Commands.add('logout', () => {
  cy.clearCookie('next-auth.session-token');
});
