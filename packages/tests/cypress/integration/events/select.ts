export const eventsCards = () => cy.get(`[data-cy$=card]`);

export const eventCreateButton = () => cy.dataCy('event-create-button');

export const eventEditButton = (index: number) => cy.dataCy(`event-${index}-edit_button`);

export const createModalElement = (identifier: string) =>
  cy.dataCy(`event-create-modal-${identifier}`);

export const editModalElement = (index: number, identifier: string) =>
  cy.dataCy(`event-${index}-edit_modal-${identifier}`);

export const addTagButton = 'tags-add_tag_button';
export const newTagInput = 'tags-new_tag-input';
export const newTagSubmitButton = 'tags-new_tag-submit_button';
export const tagCloseButton = (index: number) => `tags-tag-${index}-close_button`;
