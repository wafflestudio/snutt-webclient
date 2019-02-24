import { cyan } from 'ansi-colors';

describe('Timetable Tabs', () => {
  it('should have default table with given name', () => {
    const defaultTableName = '나의 시간표';
    cy.visit('/');
    cy.get('.timetable-tabs > .tab-button:first-child .table-title').contains(
      defaultTableName,
    );
  });

  describe('Add button', () => {
    it('should add new table at the last', () => {
      const newTableName = '너의 시간표';
      cy.visit('/', {
        onBeforeLoad(win) {
          cy.stub(win, 'prompt').returns(newTableName);
        },
      });
      cy.wait(3000);
      cy.get('[data-cy=add-new-timetable]').click();
      cy.window()
        .its('prompt')
        .should('be.called');
      // check whether tab has created
      cy.get(
        '.timetable-tabs > .tab-button:nth-child(2) .table-title',
      ).contains(newTableName);
    });
  });

  describe('Tab button', () => {
    it('should change active table when clicked', () => {
      cy.get('.timetable-tabs > .tab-button:nth-child(2)').click();
      cy.get('.timetable-tabs > .tab-button:nth-child(2)').should(
        'have.class',
        'active',
      );

      cy.get('.timetable-tabs > .tab-button:nth-child(1)').click();
      cy.get('.timetable-tabs > .tab-button:nth-child(1)').should(
        'have.class',
        'active',
      );
    });

    it('should delete the table when delete button is clicked', () => {
      cy.visit('/');
      cy.get('.timetable-tabs > .tab-button:first-child svg', {
        timeout: 20000,
      }).click();
      const remainingTableName = '너의 시간표';
      cy.get('.timetable-tabs > .tab-button:first-child .table-title').should(
        'not.exist',
      );
    });
  });
});
