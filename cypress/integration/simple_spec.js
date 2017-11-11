describe('SNUTT Web client test', () => {
  context('Coursebook', () => {
    it('should show current coursebook', () => {
      cy.visit('http://localhost:3000');
      cy.get('.Select-value-label', { timeout: 15000 });
    });

    it('should change coursebook', () => {
      cy.get('.Select-value-label').click();
      let oldestTitle;
      const oldest = cy.get('.Select-menu-outer')
                      .find('.Select-option')
                      .last();
      oldest.then(($option) => {
        oldestTitle = $option.text();
        oldest.click();
        cy.get('.Select-value-label').should('have.text', oldestTitle);
      });
    });
  });

  context('Search', () => {
    it('should show courses according to query', () => {
      cy.get('.searchbar-wrapper input').type('글기');
      cy.get('.searchbar-wrapper form').submit();
      cy.get('.resultTable .tr-result').then(($el) => {
        expect($el.length).to.be.greaterThan(5);
      });
    });

    it('should show additional buttons when hovered', () => {
      const row = cy.get('.resultTable .tr-result').first().trigger('mouseover').as('row');
      // cy.get('@row').find('.btn-default').first().click();
    });

    it('should fail to add class without timetable', () => {
      const row = cy.get('.resultTable .tr-result').first();
      const stub = cy.stub();
      cy.on('window:alert', stub);
      row.find('.btn-default').last().click().then(() => {
        expect(stub).to.be.calledOnce;
      });
    });
  });

  context('Tabs', () => {

  });
});
