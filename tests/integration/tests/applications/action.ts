import { ApplicationStatus } from 'data/application';

export const fillApplicationForm = ({ nameInGame }: { nameInGame: string }) => {
  cy.dataCy('nameInGame', 'input').type(nameInGame);
  cy.dataCy('steamName', 'input').type('Steam name');
  cy.dataCy('steamID', 'input').type('Steam id');
  cy.dataCy('whereDidYouFindTheServer', 'textarea').type('I found the server...');
  cy.dataCy('whyDidYouChooseThisServer', 'textarea').type('I chose this server...');
  cy.dataCy('whatAreYourPlansAsAViking', 'textarea').type('I plan to...');
  cy.dataCy('background', 'textarea').type('I was a Viking...');
};

export const chooseAnotherStatus = (value: ApplicationStatus) =>
  cy.dataCy('choose-another-status-popover').find(`input[value="${value}"]`).parent().click();
