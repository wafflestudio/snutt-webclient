describe('Basic Auth', () => {
  const testId = Cypress.env('testId');
  const testPassword = Cypress.env('testPassword');
  describe('Create Account', () => {
    it('Visits the snutt website', () => {
      cy.visit('/login');
    });

    it('Go to navigate page', () => {
      cy.get('.btn.join').click();
      cy.url().should('include', '/signup');
    });

    it('Create an account', () => {
      cy.get(':nth-child(2) > input').type(testId);
      cy.get(':nth-child(3) > input').type(testPassword);
      cy.get(':nth-child(4) > input').type(testPassword);
      cy.get('.btn').click();
      cy.location().should((location) => {
        expect(location.pathname).to.eq('/');
      });
    });
  });

  describe('Login / Logout', () => {
    it('Login', () => {
      cy.visit('/login');
      cy.get(':nth-child(2) > input').type(testId);
      cy.get(':nth-child(3) > input').type(testPassword);
      cy.get('.primary').click();
      cy.get('#profile').contains(testId);
    });

    it('Logout', () => {
      cy.get('#profile').click();
      cy.get(':nth-child(5) > .col-xs-8 > .btn').click();
      cy.get('#profile').contains('로그인');
    });
  });

  describe('Remove account', () => {
    it('Login Again', () => {
      cy.visit('/login');
      cy.get(':nth-child(2) > input').type(testId);
      cy.get(':nth-child(3) > input').type(testPassword);
      cy.get('.primary').click();
      cy.get('#profile').contains(testId);
    });

    it('Remove account', () => {
      cy.get('#profile').click();
      cy.get(':nth-child(6) > .col-xs-8 > .btn').click();
      cy.get('#profile').contains('로그인');
    });

    it('Fail to login', () => {
      const stub = cy.stub();
      cy.on('window:alert', stub);

      cy.visit('/login');
      cy.get(':nth-child(2) > input').type(testId);
      cy.get(':nth-child(3) > input').type(testPassword);
      cy.get('.primary').click();
      cy.url().should('include', '/login');
    });
  });
});
