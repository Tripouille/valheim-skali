export const eventCards = () => cy.get(`[data-cy^=event-]`);

export const createEventButton = () => cy.dataCy('events').dataCy('create-event', 'button');

export const createEventModal = () => cy.dataCy('create-event-modal');

export const editEventButton = (index: number, page = 0) =>
  cy.dataCy('events').dataCy(`event-${page}-${index}`).dataCy('edit', 'button');

export const editEventModal = () => cy.dataCy('edit-event-modal');

export const tagCloseButton = (container: Cypress.Chainable<JQuery<HTMLElement>>, index: number) =>
  container.dataCy(`tag-${index}`).dataCy('close', 'button');
