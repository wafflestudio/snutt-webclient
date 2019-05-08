describe('Basic Auth', () => {
  const testId = 'cypressTest' + Date.now();
  const testPassword = 'password123';

  describe('Temp auth', () => {
    it('should show default empty table', () => {
      cy.visit('/');
      const defaultName = '나의 시간표';
      cy.get('[data-cy=timetable-tab]').contains(defaultName);
    });
  });

  describe('Create Account', () => {
    it('should redirect to homepage', () => {
      cy.visit('/signup');
      cy.get('[data-cy=signup-id]').type(testId);
      cy.get('[data-cy=signup-password]').type(testPassword);
      cy.get('[data-cy=signup-password-validate]').type(testPassword);
      cy.get('[data-cy=signup-submit]').click();
      cy.location('pathname').should('eq', '/');
      cy.get('[data-cy=profile]').contains(testId);
    });

    it('should show username at the top after login', () => {
      cy.get('[data-cy=profile]').contains(testId);
    });

    it('should not proceed if there the id is taken', () => {
      cy.visit('/signup');
      const stub = cy.stub();
      cy.on('window:alert', stub);

      cy.get('[data-cy=signup-id]').type(testId);
      cy.get('[data-cy=signup-password]').type(testPassword);
      cy.get('[data-cy=signup-password-validate]').type(testPassword);
      cy.get('[data-cy=signup-submit]').click();

      cy.location('pathname').should('eq', '/signup');
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
      cy.location('pathname').should('eq', '/');
      cy.get('[data-cy=profile]').contains(testId);

      cy.get('[data-cy=profile]').click();
      cy.location('pathname').should('eq', '/myPage');

      cy.on('window:confirm', () => {
        //https://docs.cypress.io/api/events/catalog-of-events.html#Window-Confirm
        return true;
      });
      cy.get('[data-cy=my-unregister]').click();
      cy.location('pathname').should('eq', '/');
    });
  });
});
