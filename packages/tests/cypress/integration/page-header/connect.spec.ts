describe('connect', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Connect button should be display', () => {
    cy.dataCy('nav_bar-account_menu-button').click();
    cy.dataCy('nav_bar-account_menu-drop_down-sign_in_out').should('be.visible');
  });
});
