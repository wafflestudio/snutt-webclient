import { createTable } from '../../src/store/timetable/actions';
const dispatch = action =>
  cy
    .window()
    .its('store')
    .invoke('dispatch', action);

describe('Timetable Tabs', () => {
  it('should have default table', () => {
    cy.visit('/');
    cy.get('.timetable-tabs > .tab-button:first-child').contains('나의 시간표');
  });

  describe('Add button', () => {
    it('should add new table at the last', () => {
      cy.wait(5000);

      const newTableName = '너의 시간표';
      cy.visit('/', {
        onBeforeLoad(win) {
          cy.stub(win, 'prompt').returns(newTableName);
        },
      });
      const defaultName = '나의 시간표';
      cy.get('[data-cy=timetable-tab]').contains(defaultName);

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
    beforeEach(() => {
      cy.visit('/');
      cy.get('.timetable-tabs > .tab-button:first-child').contains(
        '나의 시간표',
      );

      dispatch(createTable('test table 2'));
      cy.get('.timetable-tabs > .tab-button:nth-child(2').contains(
        'test table 2',
      );
    });

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
      cy.get('[data-cy=timetable-tab-delete]')
        .first()
        .click();
      const remainingTableName = 'test table 2';
      cy.get('[data-cy=timetable-tab]').contains(remainingTableName);
      cy.get('[data-cy=timetable-tab]').should('have.length', 1);
    });
  });
});
