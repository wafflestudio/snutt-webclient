describe('Basic Auth', () => {
  const testId = Cypress.env('testId');
  const testPassword = Cypress.env('testPassword');
  describe('Create Account', () => {
    it('should redirect to homepage', () => {
      cy.visit('/signup');
      cy.get('[data-cy=signup-id]').type(testId);
      cy.get('[data-cy=signup-password]').type(testPassword);
      cy.get('[data-cy=signup-password-validate]').type(testPassword);
      cy.get('[data-cy=signup-submit]').click();
      cy.location('pathname', { timeout: 20000 }).should('eq', '/');
      cy.get('[data-cy=profile]').contains(testId);
    });

    it('should warn if there the id is taken', () => {
      cy.visit('/signup');
      cy.get('[data-cy=signup-id]').type(testId);
      cy.get('[data-cy=signup-password]').type(testPassword);
      cy.get('[data-cy=signup-password-validate]').type(testPassword);
      cy.get('[data-cy=signup-submit]').click();
      cy.get('[data-cy=signup-error]').contains('duplicate id');
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

  describe('Keep login', () => {
    beforeEach(() => {
      cy.visit('/login');
      cy.get('[data-cy=login-id]').type(testId);
      cy.get('[data-cy=login-password]').type(testPassword);
    });
    it('should keep user after refresh if checked', () => {
      cy
        .get('.checkbox-inline > div > span')
        .first()
        .click();
      cy.get('[data-cy=login-submit]').click();
      cy.location('pathname', { timeout: 20000 }).should('eq', '/');
      cy.reload();
      cy.get('[data-cy=profile]', { timeout: 20000 }).contains(testId);
    });

    it('should not keep user after refresh if not checked', () => {
      cy.get('[data-cy=login-submit]').click();
      cy.location('pathname', { timeout: 20000 }).should('eq', '/');
      cy.reload();
      cy.get('[data-cy=profile]', { timeout: 20000 }).should('not', testId);
    });
  });

  describe('Logout', () => {
    it('shoud redirect user after logout', () => {
      cy.visit('/login');
      cy.get('[data-cy=login-id]').type(testId);
      cy.get('[data-cy=login-password]').type(testPassword);
      cy.get('[data-cy=login-submit]').click();
      cy.get('[data-cy=profile]').contains(testId);

      cy.get('[data-cy=profile]').click();
      cy.get('[data-cy=my-logout]').click();
      cy.get('[data-cy=profile]').contains('로그인');
    });
  });

  describe('Remove account', () => {
    it('should redirect to home after delete', () => {
      cy.visit('/login');
      cy.get('[data-cy=login-id]').type(testId);
      cy.get('[data-cy=login-password]').type(testPassword);
      cy.get('[data-cy=login-submit]').click();
      cy.location('pathname', { timeout: 20000 }).should('eq', '/');
      cy.get('[data-cy=profile]').click();
      cy.get('[data-cy=my-unregister]').click();
      cy.location('pathname', { timeout: 20000 }).should('eq', '/');
    });
  });
});
