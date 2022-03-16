export const eventsCards = () => cy.get(`[data-cy$=card]`);

export const eventCreateButton = () => cy.dataCy('event-create-button');

export const eventEditButton = (index: number) => cy.dataCy(`event-${index}-edit_button`);

export const createModalElement = (identifier: string) =>
  cy.dataCy(`event-create-modal-${identifier}`);

export const editModalElement = (index: number, identifier: string) =>
  cy.dataCy(`event-${index}-edit_modal-${identifier}`);
