/* eslint-disable @typescript-eslint/no-namespace */
import { SpecialRoleName } from 'data/role';
import { PermissionCategory, Permissions } from 'utils/permissions';

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      dataCy(value: string, selector?: string): Chainable<JQuery<HTMLElement>>;

      main(options?: Partial<Cypress.Timeoutable>): Chainable<JQuery<HTMLElement>>;

      /* Login by setting a custom cookie for next-auth */
      login(): void;

      // Populate collections in database
      seedCollection(collectionName: string, fixtureFileName: string): void;
      setPermission<C extends PermissionCategory>(
        roleName: string,
        permissionCategory: C,
        permissionPrivilege: Permissions[C],
      ): void;
      setUserRoles(roleNames: SpecialRoleName[]): void;
    }
  }
}

import './commands';
