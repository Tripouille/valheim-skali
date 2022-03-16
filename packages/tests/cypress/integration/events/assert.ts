import { APIRoute } from '@packages/utils/routes';
import { selectMain } from '../common/select';
import * as Select from './select';

const noEventEditionTools = () => {
  Select.eventCreateButton().should('not.exist');
  Select.eventEditButton(0).should('not.exist');
};

export const readOnlyEvents = () => {
  selectMain().contains('Événements').should('be.visible');
  Select.eventsCards().should('have.length', 2);
  noEventEditionTools();
};

export const noEvents = () => {
  Select.eventsCards().should('not.exist');
  noEventEditionTools();
};

const event1 = {
  name: 'Name',
  description: 'Description',
  startDate: '',
  continuous: false,
  tags: [],
};
const event2 = {
  name: 'Name2',
  discordLink: 'https://discord.com/channels/2',
  startDate: '2050-01-01T20:30:00.000+01:00',
  endDate: '2050-01-15T11:00:00.000+01:00',
  continuous: true,
  location: 'Some location 2',
  RPDescription: 'RP description 2',
  description: 'Description 2',
  tags: ['A tag 2', 'A tag 3'],
};
const event3 = {
  name: 'Name3',
  discordLink: 'https://discord.com/channels/3',
  startDate: '2050-01-01T20:00:00.000+01:00',
  continuous: false,
  location: 'Some location 3',
  RPDescription: 'RP description 3',
  description: 'Description 3',
  tags: [],
};

export const canCreateEvents = () => {
  /* Create event with only required fields */
  cy.intercept('POST', APIRoute.EVENTS).as('createEvent');
  Select.eventCreateButton().click();
  Select.createModalElement('submit').should('exist').and('be.disabled');
  Select.createModalElement('name-input').type(event1.name);
  Select.createModalElement('start_date-input').should('not.have.value', '');
  Select.createModalElement('description-textarea').type(event1.description);

  Select.createModalElement('submit').should('not.be.disabled').click();
  cy.wait('@createEvent').its('response.statusCode').should('eq', 201);
  Select.eventsCards().should('have.length', 3).contains(event1.name);

  /* Create event with all fields */
  Select.eventCreateButton().click();
  Select.createModalElement('submit').should('exist').and('be.disabled');
  Select.createModalElement('name-input').type(event2.name);
  Select.createModalElement('discord_link-input').type(event2.discordLink);
  Select.createModalElement('start_date-input').type(event2.startDate.slice(0, 16));
  Select.createModalElement('end_date-input').type(event2.endDate.slice(0, 16));
  Select.createModalElement('continuous-switch').click();
  Select.createModalElement('location-input').type(event2.location);
  Select.createModalElement('RPDescription-textarea').type(event2.RPDescription);
  Select.createModalElement('description-textarea').type(event2.description);

  // Test tags form
  Select.createModalElement('tags-add_tag-button').click();
  Select.createModalElement('tags-add_tag-input').type('A tag{enter}');
  Select.createModalElement('tags-tag-0-close_button').click();
  Select.createModalElement('tags-tag-0').should('not.exist');
  Select.createModalElement('tags-add_tag-button').click();
  Select.createModalElement('tags-add_tag-input').type(event2.tags[0]);
  Select.createModalElement('tags-add_tag-submit').click();
  Select.createModalElement('tags-tag-0').should('exist');
  cy.focused().type(`${event2.tags[1]}{enter}`);
  // End test tags form

  Select.createModalElement('submit').click();
  cy.wait('@createEvent').should(xhr => {
    expect(xhr.response?.statusCode).to.eq(201);
    expect(xhr.request.body).to.eql(event2);
  });
  Select.eventsCards()
    .should('have.length', 4)
    .and('contain', event2.name)
    .and('contain', event2.tags[1]);
  Select.createModalElement('close_button').should('not.exist');
};

export const canEditEvent = () => {
  cy.intercept('PUT', `${APIRoute.EVENTS}/*`).as('updateEvent');
  Select.eventEditButton(0).should('be.visible').click();
  Select.editModalElement(0, 'name-input').clear().type(event3.name);
  Select.editModalElement(0, 'discord_link-input').clear().type(event3.discordLink);
  Select.editModalElement(0, 'start_date-input').clear().type(event3.startDate.slice(0, 16));
  Select.editModalElement(0, 'end_date-input').clear();
  Select.editModalElement(0, 'continuous-switch').click();
  Select.editModalElement(0, 'location-input').clear().type(event3.location);
  Select.editModalElement(0, 'tags-tag-1-close_button').click();
  Select.editModalElement(0, 'tags-tag-0-close_button').click();
  Select.editModalElement(0, 'RPDescription-textarea').clear().type(event3.RPDescription);
  Select.editModalElement(0, 'description-textarea').clear().type(event3.description);

  Select.editModalElement(0, 'submit').click();
  cy.wait('@updateEvent').should(xhr => {
    expect(xhr.response?.statusCode).to.eq(200);
    expect(xhr.request.body).to.eql(event3);
  });
  Select.editModalElement(0, 'close_button').click().should('not.exist');
  Select.eventsCards().should('have.length', 4).and('contain', event3.name);
};

export const canDeleteEvent = () => {
  cy.intercept('DELETE', `${APIRoute.EVENTS}/*`).as('deleteEvent');
  Select.eventEditButton(0).click();
  Select.editModalElement(0, 'delete').click();
  Select.editModalElement(0, 'delete-confirm').click();
  cy.wait('@deleteEvent').its('response.statusCode').should('eq', 200);
  Select.eventsCards().should('have.length', 3);
};
