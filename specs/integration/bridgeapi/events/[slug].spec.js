/// <reference types="cypress" />

const url = '/events/26';

describe('Events Show', () => {
  beforeEach(() => {
    cy.clearCookies();
  });

  afterEach(() => {
    cy.clearCookies();
  });

  it('redirects to login with bad token', () => {
    cy.setBadToken();
    cy.visit(url);

    cy.location().should((location) => {
      expect(location.pathname).to.eq('/users/login');
    });
  });

  it('can show or hide retries', () => {
    cy.setToken();
    cy.visit(url);

    cy.get('#event-timeline')
      .children()
      .should('have.length', 4);

    cy.get('#failed-attempts')
      .click()
      .click();

    cy.get('#event-timeline')
      .children()
      .should('have.length', 8);

    cy.get('#failed-attempts')
      .click();

    cy.get('#event-timeline')
      .children()
      .should('have.length', 4);
  });

  // TODO: Somehow test all other status codes
  context('shows alert', () => {
    it('can show success alert on 20', () => {
      cy.setToken();
      cy.visit(url);

      cy.get('#success-alert')
        .contains('200 - OK')
        .should('be.visible');

      cy.get('.MuiAlert-standardSuccess')
        .contains('200 - OK')
        .should('be.visible');
    });
  });
});
