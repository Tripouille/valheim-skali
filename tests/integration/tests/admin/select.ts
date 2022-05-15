export const roleLines = () => cy.get(`[data-cy^=role-]`);

export const permissionsFormSelect = (category: string) =>
  cy.dataCy('permissions-form').dataCy(category, 'select');

export const permissionsFormOption = (category: string, value: string) =>
  permissionsFormSelect(category).find(`option[value=${value}]`);

export const reqPermissionsFormSelect = () =>
  cy.dataCy('required-permissions-form').dataCy('required-to-assign', 'select');
