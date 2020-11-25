/// <reference types="cypress" />

const stubSuccessSignUp = () => {
  cy.server();
  cy.route({
    url: '/user',
    method: 'POST',
    status: 201,
    response: {
      user: {
        email: 'demo@demo.com',
        notifications: false,
      },
    },
  });
};

const stubFailSignUp = () => {
  cy.server();
  cy.route({
    url: '/user',
    method: 'POST',
    status: 422,
    response: {
      error: 'email or password is invalid',
    },
  });
};

const stubSuccessLogin = () => {
  cy.server();
  cy.route({
    url: '/login',
    method: 'POST',
    status: 201,
    response: {
      token: '123984790182347',
    },
  });
};

const stubFailLogin = () => {
  cy.server();
  cy.route({
    url: '/login',
    method: 'POST',
    status: 422,
    response: {
      token: '123984790182347',
    },
  });
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
