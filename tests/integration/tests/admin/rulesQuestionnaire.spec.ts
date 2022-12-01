import { SpecialRoleName } from 'data/role';
import { rulesQuestionnaireCollectionName } from 'data/rulesQuestionnaire';
import { PermissionCategory, rulesQuestionnairePrivilege } from 'utils/permissions';
import * as Action from './action';

describe('rules questionnaire', () => {
  before(() => {
    cy.setUserRoles([SpecialRoleName.MEMBER]);
    cy.setPermission(
      SpecialRoleName.MEMBER,
      PermissionCategory.RULES_QUESTIONNAIRE,
      rulesQuestionnairePrivilege.MANAGE,
    );
  });

  beforeEach(() => {
    cy.seedCollection(rulesQuestionnaireCollectionName, 'rulesQuestionnaire');
    cy.login();
    Action.visitRulesQuestionnairePage();
  });

  it('should be able to edit the questions', () => {
    cy.dataCy('edit').should('have.length', 8);

    // Preamble
    cy.dataCy('admin').should('contain.text', 'Preamble');
    cy.dataCy('edit').first().click();
    cy.get('textarea').should('have.value', 'Preamble').clear().type('New preamble');
    cy.dataCy('cancel-edition').click();
    cy.dataCy('admin').should('contain.text', 'Preamble').and('not.contain.text', 'New preamble');
    cy.dataCy('edit').first().click();
    cy.get('textarea').should('have.value', 'Preamble').clear().type('New preamble');
    cy.dataCy('submit-edition').click();
    cy.get('textarea').should('not.exist');
    cy.dataCy('admin').should('contain.text', 'New preamble');
    cy.get('body').should('contain.text', 'Le préambule a bien été modifié.');

    // Simple question
    cy.dataCy('admin').should('contain.text', 'How many wards can you have ?');
    cy.dataCy('edit').eq(1).click();
    cy.get('textarea')
      .should('have.value', 'How many wards can you have ?')
      .clear()
      .type('How many beacons can you have ?');
    cy.dataCy('cancel-edition').click();
    cy.dataCy('admin')
      .should('contain.text', 'How many wards can you have ?')
      .and('not.contain.text', 'How many beacons can you have ?');
    cy.dataCy('edit').eq(1).click();
    cy.get('textarea')
      .should('have.value', 'How many wards can you have ?')
      .clear()
      .type('How many beacons can you have ?');
    cy.dataCy('submit-edition').click();
    cy.get('textarea').should('not.exist');
    cy.dataCy('admin').should('contain.text', 'How many beacons can you have ?');
    cy.get('body').should('contain.text', 'La question a bien été modifiée.');

    // Multiple choice question
    cy.dataCy('admin').should(
      'contain.text',
      'What minerals can you mine underground ?CopperTinIronSilver',
    );
    const editMultipleChoiceQuestion = () => {
      cy.dataCy('edit').eq(4).click();
      cy.get('textarea')
        .should('have.value', 'What minerals can you mine underground ?')
        .clear()
        .type('Which minerals can you mine underground ?');
      cy.get('input[value="Tin"]').siblings('[data-cy="delete-option"]').click();
      cy.get('input[value="Tin"]').should('not.exist');
      cy.get('input[value="Silver"]').clear().type('Metal');
      cy.dataCy('new-option', 'input').type('Flametal{enter}');
      cy.get('input[value="Flametal"]').should('exist');
    };
    editMultipleChoiceQuestion();
    cy.dataCy('cancel-edition').click();
    editMultipleChoiceQuestion();
    cy.dataCy('submit-edition').click();
    cy.dataCy('admin').should(
      'contain.text',
      'Which minerals can you mine underground ?CopperIronMetalFlametal',
    );
    cy.get('body').should('contain.text', 'La question a bien été modifiée.');

    // Switch from single-choice to long
    cy.dataCy('admin').should('contain.text', "Can you open someone else's tomb ?YesNo");
    cy.dataCy('edit').eq(3).click();
    cy.get('ul input').should('have.length', 3);
    cy.get('[role=radiogroup]').find('label').eq(1).click();
    cy.get('ul input').should('not.exist');
    cy.get('textarea').should('have.value', "Can you open someone else's tomb ?");
    cy.dataCy('submit-edition').click();
    cy.get('textarea').should('not.exist');
    cy.dataCy('admin')
      .should('contain.text', "Can you open someone else's tomb ?")
      .and('not.contain.text', 'YesNo');
    cy.get('body').should('contain.text', 'La question a bien été modifiée.');

    // Switch from long to multiple-choice, and change position type
    cy.dataCy('admin').should('contain.text', 'Do you think the rules are right ?');
    cy.dataCy('edit').eq(2).click();
    cy.get('[role=radiogroup]').find('label').eq(3).click();
    cy.dataCy('admin').find('select').select('beginning');
    cy.dataCy('new-option', 'input').type('Yes');
    cy.dataCy('add-option', 'button').click();
    cy.dataCy('new-option', 'input').type('No{enter}');
    cy.dataCy('submit-edition').click();
    cy.dataCy('admin')
      .should('contain.text', 'Choix multiple (Au début)')
      .and('contain.text', 'Do you think the rules are right ?YesNo');
    cy.get('body').should('contain.text', 'La question a bien été modifiée.');
  });

  it('should be able to add a question', () => {
    // Simple
    cy.dataCy('add-question').click();
    cy.get('[role=radiogroup]').find('label').first().click();
    cy.get('textarea').should('have.value', '').type('Can you build a wall ?');
    cy.intercept('POST', '/api/rules-questionnaire').as('createQuestion');
    cy.dataCy('create-question').click();
    cy.wait('@createQuestion');
    cy.dataCy('admin').should('contain.text', 'Can you build a wall ?');
    cy.get('body').should('contain.text', 'La question a bien été ajoutée.');

    // Single choice with position type
    cy.dataCy('add-question').click();
    cy.dataCy('admin').find('[role=radiogroup]').find('label').eq(2).click();
    cy.dataCy('admin').find('select').select('beginning');
    cy.get('textarea')
      .should('have.value', '')
      .type('How much time can you stay in the first zone ?');
    cy.dataCy('create-question').should('be.disabled');
    cy.dataCy('new-option', 'input').type('1 day{enter}');
    cy.dataCy('create-question').should('be.disabled');
    cy.dataCy('new-option', 'input').type('3 days{enter}');
    cy.dataCy('new-option', 'input').type('10 days{enter}');
    cy.dataCy('new-option', 'input').type('As long as you want{enter}');
    cy.intercept('POST', '/api/rules-questionnaire').as('createQuestion');
    cy.dataCy('create-question').click();
    cy.wait('@createQuestion');
    cy.dataCy('admin')
      .should('contain.text', 'Choix unique (Au début)')
      .and(
        'contain.text',
        'How much time can you stay in the first zone ?1 day3 days10 daysAs long as you want',
      );
    // Last created question should be at the beginning
    cy.dataCy('admin')
      .invoke('text')
      .should('match', /As long as you want.*Can you build a wall ?/);
    cy.get('body').should('contain.text', 'La question a bien été ajoutée.');
  });

  it('should be able to delete a question but not the preamble', () => {
    cy.dataCy('delete').should('have.length', 7);
    cy.dataCy('delete').first().click();
    cy.dataCy('confirm-delete').first().click();
    cy.dataCy('admin').should('not.contain.text', 'How many wards can you have ?');
    cy.get('body').should('contain.text', 'La question a bien été supprimée.');
  });

  it("should be able to change a non-random question's position", () => {
    // Can't move a random position type question
    cy.dataCy('admin')
      .contains('How many wards can you have ?')
      .closest('[data-cy=question]')
      .dataCy('move-up')
      .should('not.exist');
    cy.dataCy('admin')
      .contains('How many wards can you have ?')
      .closest('[data-cy=question]')
      .dataCy('move-down')
      .should('not.exist');

    // Can't move up the first question
    cy.dataCy('admin')
      .contains('end 1')
      .closest('[data-cy=question]')
      .dataCy('move-up')
      .should('not.exist');

    // Move down the first question
    cy.dataCy('admin').contains('end 1').closest('[data-cy=question]').dataCy('move-down').click();
    cy.dataCy('admin')
      .invoke('text')
      .should('match', /end 2.*end 1/);
    cy.get('body').should('contain.text', 'La question a bien été bougée.');

    // Can't move down the last question
    cy.dataCy('admin')
      .contains('end 3')
      .closest('[data-cy=question]')
      .dataCy('move-down')
      .should('not.exist');

    // Move up the last question
    cy.dataCy('admin').contains('end 3').closest('[data-cy=question]').dataCy('move-up').click();
    cy.dataCy('admin')
      .invoke('text')
      .should('match', /end 2.*end 3.*end 1/);
    cy.get('body').should('contain.text', 'La question a bien été bougée.');
  });
});
