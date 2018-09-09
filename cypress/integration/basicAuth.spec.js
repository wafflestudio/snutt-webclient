describe('Basic Auth', () => {
  const testId = Cypress.env('testId');
  const testPassword = Cypress.env('testPassword');
  describe('Create Account', () => {
    it('Create an account', () => {
      cy.visit('/signup');
      cy.get(':nth-child(2) > input').type(testId);
      cy.get(':nth-child(3) > input').type(testPassword);
      cy.get(':nth-child(4) > input').type(testPassword);
      cy.get('.btn').click();
      cy.location('pathname', { timeout: 20000 }).should('eq', '/');
      cy.get('#profile').contains(testId);
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
    it('Login', () => {
      cy.visit('/login');
      cy.get(':nth-child(2) > input').type(testId);
      cy.get(':nth-child(3) > input').type(testPassword);
      cy.get('.primary').click();
      cy.location('pathname', { timeout: 20000 }).should('eq', '/');
      cy.get('#profile').contains(testId);
    });

    it('Delete account and redirect to home', () => {
      cy.get('#profile').click();
      cy.get(':nth-child(6) > .col-xs-8 > .btn').click();
      cy.location('pathname', { timeout: 20000 }).should('eq', '/');
      cy.get('#profile').contains('로그인');
    });

    it('Fail to login with deleted Id', () => {
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
