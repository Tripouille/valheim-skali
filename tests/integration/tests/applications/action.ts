import { ApplicationStatus } from 'data/application';

export const chooseAnotherStatus = (value: ApplicationStatus) =>
  cy.dataCy('choose-another-status-popover').find(`input[value="${value}"]`).parent().click();
