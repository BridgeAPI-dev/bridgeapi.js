/// <reference types="cypress" />

describe('Sign Up', () => {
  beforeEach(() => {
    cy.clearCookies();
  });

  afterEach(() => {
    cy.clearCookies();
  });

  it('redirects to login with bad token', () => {
    cy.setBadToken();
    cy.visit('/dashboard');

    cy.location().should((location) => {
      expect(location.pathname).to.eq('/users/login');
    });
  });

  it('has 3 bridges displayed', () => {
    cy.setToken();
    cy.visit('/dashboard');

    cy.get('#dashboard-card-container')
      .children().should('have.length', 3);

    cy.get('#card-title-0')
      .contains('title_0').should('be.visible');
    cy.get('#card-title-0')
      .parent().should('have.attr', 'href').and('eq', '/bridge/7');
    cy.get('#card-completedAt-0')
      .contains('Wed Nov 25 2020').should('be.visible');
    cy.get('#card-updateAt-0')
      .contains('Wed Nov 25 2020').should('be.visible');
    cy.get('#card-eventCount-0')
      .contains('1').should('be.visible');

    cy.get('#card-title-1')
      .contains('title_1').should('be.visible');
    cy.get('#card-title-1')
      .parent().should('have.attr', 'href').and('eq', '/bridge/4');
    cy.get('#card-completedAt-1')
      .contains('No requests').should('be.visible');
    cy.get('#card-updateAt-1')
      .contains('Thu Nov 26 2020').should('be.visible');
    cy.get('#card-eventCount-1')
      .contains('0').should('be.visible');

    cy.get('#card-title-2')
      .contains('title_2').should('be.visible');
    cy.get('#card-title-2')
      .parent().should('have.attr', 'href').and('eq', '/bridge/5');
    cy.get('#card-completedAt-2')
      .contains('No requests').should('be.visible');
    cy.get('#card-updateAt-2')
      .contains('Thu Nov 26 2020').should('be.visible');
    cy.get('#card-eventCount-2')
      .contains('0').should('be.visible');
  });
});
