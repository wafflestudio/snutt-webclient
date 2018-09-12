describe('Basic Auth', () => {
  const testId = Cypress.env('testId');
  const testPassword = Cypress.env('testPassword');
  describe('Create Account', () => {
    it('should redirect to homepage', () => {
      cy.visit('/signup');
      cy.get(':nth-child(2) > input').type(testId);
      cy.get(':nth-child(3) > input').type(testPassword);
      cy.get(':nth-child(4) > input').type(testPassword);
      cy.get('.btn').click();
      cy.location('pathname', { timeout: 20000 }).should('eq', '/');
      cy.get('[data-cy=profile]').contains(testId);
    });

    it('should warn if password check is failed', () => {
      cy.visit('/signup');
      cy.get(':nth-child(2) > input').type(testId);
      cy.get(':nth-child(3) > input').type(testPassword);
      cy.get(':nth-child(4) > input').type(testPassword);
      cy.get('.btn').click();
      cy.get('.error').contains('duplicate id');
    });
  });

  describe('Login', () => {
    beforeEach(() => {
      cy.visit('/login');
      cy.get('[data-cy=login-id]').type(testId);
      cy.get('[data-cy=login-password]').type(testPassword);
      cy.get('[data-cy=login-submit]').click();
    });

    it('should redirect user after login', () => {
      cy.location('pathname', { timeout: 20000 }).should('eq', '/');
    });

    it('should show username at the top', () => {
      cy.get('[data-cy=profile]', { timeout: 20000 }).contains(testId);
    });
  });

  describe('Login Save', () => {
    beforeEach(() => {
      cy.visit('/login');
      cy.get('[data-cy=login-id]').type(testId);
      cy.get('[data-cy=login-password]').type(testPassword);
      // cy.get('[data-cy=login-keep]', { force: true }).check();
      cy.get('[data-cy=login-keep]', { force: true }).click();
      cy.get('[data-cy=login-submit]').click();
    });

    it('should keep user after refresh', () => {
      cy.reload();
      cy.get('[data-cy=profile]', { timeout: 20000 }).contains(testId);
    });
  });

  describe('Logout', () => {
    it('shoud redirect user after logout', () => {
      cy.visit('/login');
      cy.get(':nth-child(2) > input').type(testId);
      cy.get(':nth-child(3) > input').type(testPassword);
      cy.get('.primary').click();
      cy.get('[data-cy=profile]').contains(testId);

      cy.get('[data-cy=profile]').click();
      cy.get(':nth-child(5) > .col-xs-8 > .btn').click();
      cy.get('[data-cy=profile]').contains('로그인');
    });
  });

  describe('Remove account', () => {
    it('should redirect to home after delete', () => {
      cy.visit('/login');
      cy.get(':nth-child(2) > input').type(testId);
      cy.get(':nth-child(3) > input').type(testPassword);
      cy.get('.primary').click();
      cy.location('pathname', { timeout: 20000 }).should('eq', '/');
      cy.get('[data-cy=profile]').click();
      cy.get(':nth-child(6) > .col-xs-8 > .btn').click();
      cy.location('pathname', { timeout: 20000 }).should('eq', '/');
    });
  });
});
