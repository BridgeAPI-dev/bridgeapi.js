/// <reference types="cypress" />

const stubSuccessLogin = () => {
  const response = {
    token: '123984790182347',
  };
  cy.stubRequest('/login', 'POST', 201, response);
};

const stubFailLogin = () => {
  const response = {
    token: '123984790182347',
  };
  cy.stubRequest('/login', 'POST', 422, response);
};

const stubDashboard = () => {
  const response = {
    bridges: [],
  };
  cy.stubRequest('/bridges', 'GET', 200, response);
};

const inputFields = () => {
  cy.get('#email-input')
    .type('demo@demo.com').should('have.value', 'demo@demo.com');

  cy.get('#password-input')
    .type('password').should('have.value', 'password');
};

const submit = () => {
  cy.get('form').submit();
};

describe('Login', () => {
  beforeEach(() => {
    cy.visit('/users/login');
  });

  it('can login', () => {
    stubSuccessLogin();
    stubDashboard();
    inputFields();
    submit();

    // TODO: Test snackbar
    // cy.get('.MuiAlert-message').contains('Account has been created. Redirecting...');
    cy.location().should((location) => {
      expect(location.pathname).to.eq('/dashboard');
    });
  });

  it('can handle failed login', () => {
    stubFailLogin();
    inputFields();
    submit();

    // cy.get('.MuiAlert-message').contains('Some error occurred. Please try again.');
    cy.location().should((location) => {
      expect(location.pathname).to.eq('/users/login');
    });
  });
});
