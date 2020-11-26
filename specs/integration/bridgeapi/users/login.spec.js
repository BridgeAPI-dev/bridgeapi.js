/// <reference types="cypress" />

import {
  stubSuccessLogin,
  stubFailLogin,
  inputEmail,
  inputPassword,
  inputLoginFields as inputFields,
  submit,
} from '../../../support/utils/login_signup_forms';

describe('Login', () => {
  beforeEach(() => {
    cy.visit('/users/login');
  });

  afterEach(() => {
    cy.clearCookies();
  });

  it('can login', () => {
    stubSuccessLogin();
    inputFields();
    submit();

    // TODO: Test snackbar
    // cy.get('.MuiAlert-message').contains('Account has been created. Redirecting...');
    cy.location().should((location) => {
      expect(location.pathname).to.eq('/dashboard');
    });
  });

  it('can handle failed api request', () => {
    stubFailLogin();
    inputFields();
    submit();

    // cy.get('.MuiAlert-message').contains('Some error occurred. Please try again.');
    cy.location().should((location) => {
      expect(location.pathname).to.eq('/users/login');
    });
  });

  it('is invalid without email', () => {
    inputPassword();
    submit();

    cy.get('#email-input').parent().should('have.class', 'Mui-error');
    cy.get('.MuiFormHelperText-root.MuiFormHelperText-contained.Mui-error')
      .contains('Required').should('be.visible');
  });

  it('is invalid wtih bad email', () => {
    inputEmail('demo@demo');
    inputPassword();

    submit();

    cy.get('#email-input').parent().should('have.class', 'Mui-error');
    cy.get('.MuiFormHelperText-root.MuiFormHelperText-contained.Mui-error')
      .contains('Invalid Email Address').should('be.visible');
  });

  it('is invalid without password', () => {
    inputEmail();
    submit();

    cy.get('#password-input')
      .parent()
      .should('have.class', 'Mui-error');
    cy.get('.MuiFormHelperText-root.MuiFormHelperText-contained.Mui-error')
      .contains('Required').should('be.visible');
  });
});
