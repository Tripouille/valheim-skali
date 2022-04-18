describe('connect', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Connect button should be display', () => {
    cy.dataCy('nav-bar').dataCy('menu', 'button').click();
    cy.dataCy('nav-bar').dataCy('sign-in-out').should('be.visible');
  });
});
