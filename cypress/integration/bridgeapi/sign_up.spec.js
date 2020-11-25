/// <reference types="cypress" />

const stubSuccessSignUp = () => {
  const response = {
    user: {
      email: 'demo@demo.com',
      notifications: false,
    },
  };
  cy.stubRequest('/user', 'POST', 201, response);
};

const stubFailSignUp = () => {
  const response = {
    error: 'email or password is invalid',
  };
  cy.stubRequest('/user', 'POST', 422, response);
};

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

const inputFields = () => {
  cy.get('#email-input')
    .type('demo@demo.com').should('have.value', 'demo@demo.com');

  cy.get('#password-input')
    .type('password').should('have.value', 'password');

  cy.get('#password-confirmation-input')
    .type('password').should('have.value', 'password');
};

const submit = () => {
  cy.get('form').submit();
};

describe('Sign Up', () => {
  beforeEach(() => {
    cy.visit('/users/signup');
  });

  it('can sign up & login', () => {
    stubSuccessSignUp();
    stubSuccessLogin();
    inputFields();
    submit();

    cy.get('.MuiAlert-message').contains('Account has been created. Redirecting...');
    cy.location().should((location) => {
      expect(location.href).to.eq('http://localhost:3000/bridge/new');
    });
  });

  it('can handle failed sign up', () => {
    stubFailSignUp();
    inputFields();
    submit();

    cy.get('.MuiAlert-message').contains('Some error occurred. Please try again.');
    cy.location().should((location) => {
      expect(location.href).to.eq('http://localhost:3000/users/signup');
    });
  });

  it('can handle failed login', () => {
    stubSuccessSignUp();
    stubFailLogin();
    inputFields();
    submit();

    cy.get('.MuiAlert-message').contains('Account has been created. Redirecting...');
    cy.location().should((location) => {
      expect(location.href).to.eq('http://localhost:3000/users/login');
    });
  });
});
