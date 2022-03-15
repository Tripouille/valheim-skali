/* eslint-disable @typescript-eslint/no-namespace */
// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************
/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      dataCy(value: string): Chainable<JQuery<HTMLElement>>;
      dataCyLike(value: string): Chainable<JQuery<HTMLElement>>;
      /** Custom command to drop and populate collection in database */
      seedCollection(collectionName: string, fixtureFileName: string): void;
      /* Custom commands to login/logout by setting a custom cookie for next-auth. */
      login(userType?: 'super_admin'): void;
      logout(): void;
    }
  }
}

import './commands';
