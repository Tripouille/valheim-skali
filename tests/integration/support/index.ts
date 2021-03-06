/* eslint-disable @typescript-eslint/no-namespace */
import { PermissionCategory, PermissionPrivilege, SpecialRoleName } from 'utils/auth';

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      dataCy(value: string, selector?: string): Chainable<JQuery<HTMLElement>>;

      main(): Chainable<JQuery<HTMLElement>>;

      /* Login by setting a custom cookie for next-auth */
      login(): void;

      // Populate collections in database
      seedCollection(collectionName: string, fixtureFileName: string): void;
      setPermission(
        roleName: string,
        permissionCategory: PermissionCategory,
        permissionPrivilege: PermissionPrivilege,
      ): void;
      setUserRoles(roleNames: SpecialRoleName[]): void;
    }
  }
}

import './commands';
