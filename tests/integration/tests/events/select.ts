export const eventCards = () => cy.get(`[data-cy^=event-][data-cy$=-card]`);

export const createEventButton = () => cy.dataCy('events').dataCy('create-event', 'a');

export const editEventButton = (index: number, page = 0) =>
  cy.dataCy('events').dataCy(`event-${page}-${index}-card`).dataCy('edit', 'a');

export const tagCloseButton = (index: number) =>
  cy.main().dataCy(`tag-${index}`).dataCy('close', 'button');
