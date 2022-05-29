import { SpecialRoleName } from 'data/role';
import { eventPrivilege } from 'utils/permissions';
import { APIRoute } from 'utils/routes';
import * as Action from './action';
import * as Select from './select';

describe('events with edit permission', () => {
  before(() => {
    Action.setMemberEventPermission(eventPrivilege.READ_WRITE);
    cy.setUserRoles([SpecialRoleName.MEMBER]);
  });

  beforeEach(() => {
    Action.seedEvents();
    cy.login();
    Action.visitEventsPageAndWaitFor(APIRoute.EVENTS);
  });

  it('should be able to create events', () => {
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
      tags: ['A tag 1', 'A tag 2'],
    };

    /* Create event with only required fields */
    cy.intercept('POST', APIRoute.EVENTS).as('createEvent');
    Select.createEventButton().click();
    Select.createEventModal().dataCy('submit', 'button').should('exist').and('be.disabled');
    Select.createEventModal().dataCy('name', 'input').type(event1.name);
    Select.createEventModal().dataCy('start_date', 'input').should('not.have.value', '');
    Select.createEventModal().dataCy('description', 'textarea').type(event1.description);

    Select.createEventModal().dataCy('submit', 'button').click();
    cy.wait('@createEvent').its('response.statusCode').should('eq', 201);
    Select.eventCards().should('have.length', 3).contains(event1.name);

    /* Create event with all fields */
    Select.createEventButton().click();
    Select.createEventModal().dataCy('submit', 'button').should('exist').and('be.disabled');
    Select.createEventModal().dataCy('name', 'input').type(event2.name);
    Select.createEventModal().dataCy('discord_link', 'input').type(event2.discordLink);
    Select.createEventModal().dataCy('start_date', 'input').type(event2.startDate.slice(0, 16));
    Select.createEventModal().dataCy('end_date', 'input').type(event2.endDate.slice(0, 16));
    Select.createEventModal().dataCy('continuous-switch').click();
    Select.createEventModal().dataCy('location', 'input').type(event2.location);
    Select.createEventModal().dataCy('add-tag', 'button').click();
    Select.createEventModal().dataCy('new-tag', 'input').type(`${event2.tags[0]}{enter}`);
    cy.focused().type(`${event2.tags[1]}{enter}`);
    Select.createEventModal()
      .dataCy('RPDescription', 'textarea')
      .focus()
      .type(event2.RPDescription);
    Select.createEventModal().dataCy('description', 'textarea').type(event2.description);

    Select.createEventModal().dataCy('submit', 'button').click();
    cy.wait('@createEvent').should(xhr => {
      expect(xhr.response?.statusCode).to.eq(201);
      expect(xhr.request.body).to.eql(event2);
    });
    Select.eventCards()
      .should('have.length', 4)
      .and('contain', event2.name)
      .and('contain', event2.tags[1]);
  });

  it('should be able to edit events', () => {
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

    cy.intercept('PUT', `${APIRoute.EVENTS}/*`).as('updateEvent');
    Select.editEventButton(0).should('be.visible').click();
    Select.editEventModal().dataCy('name', 'input').clear().type(event3.name);
    Select.editEventModal().dataCy('discord_link', 'input').clear().type(event3.discordLink);
    Select.editEventModal()
      .dataCy('start_date', 'input')
      .clear()
      .type(event3.startDate.slice(0, 16));
    Select.editEventModal().dataCy('end_date', 'input').clear();
    Select.editEventModal().dataCy('continuous-switch').click();
    Select.editEventModal().dataCy('location', 'input').clear().type(event3.location);
    Select.tagCloseButton(Select.editEventModal(), 2).click();
    Select.tagCloseButton(Select.editEventModal(), 1).click();
    Select.tagCloseButton(Select.editEventModal(), 0).click();
    Select.editEventModal().dataCy('RPDescription', 'textarea').clear().type(event3.RPDescription);
    Select.editEventModal().dataCy('description', 'textarea').clear().type(event3.description);

    Select.editEventModal().dataCy('submit', 'button').click();
    cy.wait('@updateEvent').should(xhr => {
      expect(xhr.response?.statusCode).to.eq(200);
      expect(xhr.request.body).to.eql(event3);
    });
    Select.editEventModal().dataCy('close-modal').click().should('not.exist');
    Select.eventCards().should('have.length', 2).and('contain', event3.name);
  });

  it('should be able to delete events', () => {
    cy.intercept('DELETE', `${APIRoute.EVENTS}/*`).as('deleteEvent');
    Select.editEventButton(0).click();
    Select.editEventModal().dataCy('delete', 'button').click();
    Select.editEventModal().dataCy('confirm-delete', 'button').click();
    cy.wait('@deleteEvent').its('response.statusCode').should('eq', 200);
    Select.eventCards().should('have.length', 1);
  });

  it('should be able to use tags form and its combobox', () => {
    Select.createEventButton().click();

    /** Can add entered tag with enter */
    Select.createEventModal().dataCy('add-tag', 'button').click();
    Select.createEventModal().dataCy('new-tag', 'input').type('Tag1{enter}');
    cy.focused().type('Tag2{enter}');
    cy.focused().should('have.value', '');
    Select.tagCloseButton(Select.createEventModal(), 0).should('exist');
    Select.tagCloseButton(Select.createEventModal(), 1).should('exist');

    /** Can add tag with click on submit button */
    cy.focused().type('Tag3').should('have.value', 'Tag3');
    Select.createEventModal().dataCy('submit-new-tag', 'button').click();
    Select.tagCloseButton(Select.createEventModal(), 2).should('exist');
    Select.createEventModal().dataCy('new-tag', 'input').should('have.focus').and('have.value', '');

    /** Can close tag and still have focus on input */
    Select.tagCloseButton(Select.createEventModal(), 0).click();
    Select.createEventModal().dataCy('new-tag', 'input').should('have.focus');

    cy.fixture('events').then(events => {
      /** Listbox displays suggestions based on input */
      cy.get('[role="listbox"] [role="option"]').should('have.length', 3);
      cy.focused().type('T');
      cy.get('[role="listbox"] [role="option"]').should('have.length', 2);
      cy.focused().type('a');
      cy.get('[role="listbox"] [role="option"]').should('have.length', 1);
      cy.focused().type('b');
      cy.get('[role="listbox"]').should('not.exist');
      cy.focused().clear();

      /** Can use up arrow */
      cy.focused().type('{upArrow}').should('have.focus').and('have.value', '');
      cy.get('[role="listbox"] [role="option"][aria-selected="true"]')
        .should('have.length', 1)
        .and('have.text', events[0].tags[2]);

      /** Listbox should be hidden on escape key and redisplayed on down arrow */
      cy.focused().type('{esc}');
      cy.get('[role="listbox"]').should('not.exist');
      cy.focused().type('{downArrow}');

      /** Can use down arrow and add first tag with menu selection */
      cy.focused().type('{downArrow}{enter}').should('have.focus').and('have.value', '');
      Select.tagCloseButton(Select.createEventModal(), 2).should('exist');
    });
  });
});
