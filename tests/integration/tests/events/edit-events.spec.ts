import { PermissionPrivilege, SpecialRoleName } from 'utils/auth';
import { APIRoute } from 'utils/routes';
import * as Action from './action';
import * as Select from './select';

describe('events with edit permission', () => {
  before(() => {
    Action.setMemberEventPermission(PermissionPrivilege.READ_WRITE);
    cy.setUserRoles([SpecialRoleName.MEMBER]);
  });

  beforeEach(() => {
    Action.seedEvents();
    cy.login();
    Action.visitEventsPage();
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
    Select.eventCreateButton().click();
    Select.createModalElement('submit').should('exist').and('be.disabled');
    Select.createModalElement('name-input').type(event1.name);
    Select.createModalElement('start_date-input').should('not.have.value', '');
    Select.createModalElement('description-textarea').type(event1.description);

    Select.createModalElement('submit').click();
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
    Select.createModalElement(Select.addTagButton).click();
    Select.createModalElement(Select.newTagInput).type(`${event2.tags[0]}{enter}`);
    cy.focused().type(`${event2.tags[1]}{enter}`);
    Select.createModalElement('RPDescription-textarea').focus().type(event2.RPDescription);
    Select.createModalElement('description-textarea').type(event2.description);

    Select.createModalElement('submit').click();
    cy.wait('@createEvent').should(xhr => {
      expect(xhr.response?.statusCode).to.eq(201);
      expect(xhr.request.body).to.eql(event2);
    });
    Select.eventsCards()
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
    Select.eventEditButton(0).should('be.visible').click();
    Select.editModalElement(0, 'name-input').clear().type(event3.name);
    Select.editModalElement(0, 'discord_link-input').clear().type(event3.discordLink);
    Select.editModalElement(0, 'start_date-input').clear().type(event3.startDate.slice(0, 16));
    Select.editModalElement(0, 'end_date-input').clear();
    Select.editModalElement(0, 'continuous-switch').click();
    Select.editModalElement(0, 'location-input').clear().type(event3.location);
    Select.editModalElement(0, Select.tagCloseButton(2)).click();
    Select.editModalElement(0, Select.tagCloseButton(1)).click();
    Select.editModalElement(0, Select.tagCloseButton(0)).click();
    Select.editModalElement(0, 'RPDescription-textarea').clear().type(event3.RPDescription);
    Select.editModalElement(0, 'description-textarea').clear().type(event3.description);

    Select.editModalElement(0, 'submit').click();
    cy.wait('@updateEvent').should(xhr => {
      expect(xhr.response?.statusCode).to.eq(200);
      expect(xhr.request.body).to.eql(event3);
    });
    Select.editModalElement(0, 'close_button').click().should('not.exist');
    Select.eventsCards().should('have.length', 2).and('contain', event3.name);
  });

  it('should be able to delete events', () => {
    cy.intercept('DELETE', `${APIRoute.EVENTS}/*`).as('deleteEvent');
    Select.eventEditButton(0).click();
    Select.editModalElement(0, 'delete').click();
    Select.editModalElement(0, 'delete-confirm').click();
    cy.wait('@deleteEvent').its('response.statusCode').should('eq', 200);
    Select.eventsCards().should('have.length', 1);
  });

  it('should be able to use tags form and its combobox', () => {
    Select.eventCreateButton().click();

    /** Can add entered tag with enter */
    Select.createModalElement(Select.addTagButton).click();
    Select.createModalElement(Select.newTagInput).type('Tag1{enter}');
    cy.focused().type('Tag2{enter}');
    cy.focused().should('have.value', '');
    Select.createModalElement(Select.tagCloseButton(0)).should('exist');
    Select.createModalElement(Select.tagCloseButton(1)).should('exist');

    /** Can add tag with click on submit button */
    cy.focused().type('Tag3').should('have.value', 'Tag3');
    Select.createModalElement(Select.newTagSubmitButton).click();
    Select.createModalElement(Select.tagCloseButton(2)).should('exist');
    Select.createModalElement(Select.newTagInput).should('have.focus').and('have.value', '');

    /** Can close tag and still have focus on input */
    Select.createModalElement(Select.tagCloseButton(0)).click();
    Select.createModalElement(Select.newTagInput).should('have.focus');

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
      Select.createModalElement(Select.tagCloseButton(2)).should('exist');
    });
  });
});
