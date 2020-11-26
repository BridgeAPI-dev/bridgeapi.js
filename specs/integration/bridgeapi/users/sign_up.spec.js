/// <reference types="cypress" />

import {
  stubSuccessSignUp,
  stubFailSignUp,
  stubSuccessLogin,
  stubFailLogin,
  inputEmail,
  inputPassword,
  inputPasswordConfirmation,
  inputSignUpFields as inputFields,
  submit,
} from '../../../support/utils/login_signup_forms';

describe('Sign Up', () => {
  beforeEach(() => {
    cy.visit('/users/signup');
  });

  afterEach(() => {
    cy.clearCookies();
  });

  it('can sign up & login', () => {
    stubSuccessSignUp();
    stubSuccessLogin();
    inputFields();
    submit();

    cy.get('.MuiAlert-message').contains('Account has been created. Redirecting...');
    cy.location().should((location) => {
      expect(location.pathname).to.eq('/bridge/new');
    });
  });

  it('can handle failed sign up', () => {
    stubFailSignUp();
    inputFields();
    submit();

    cy.get('.MuiAlert-message').contains('Some error occurred. Please try again.');
    cy.location().should((location) => {
      expect(location.pathname).to.eq('/users/signup');
    });
  });

  it('can handle failed api request', () => {
    stubSuccessSignUp();
    stubFailLogin();
    inputFields();
    submit();

    cy.location().should((location) => {
      expect(location.pathname).to.eq('/users/login');
    });
  });

  it('is invalid without email', () => {
    inputPassword();
    inputPasswordConfirmation();

    submit();

    cy.get('#email-input').parent().should('have.class', 'Mui-error');
    cy.get('.MuiFormHelperText-root.MuiFormHelperText-contained.Mui-error')
      .contains('Required').should('be.visible');
  });

  it('is invalid without password', () => {
    inputEmail();
    inputPasswordConfirmation();

    submit();

    cy.get('#password-input').parent().should('have.class', 'Mui-error');
    cy.get('.MuiFormHelperText-root.MuiFormHelperText-contained.Mui-error')
      .contains('Required').should('be.visible');
  });

  it('is invalid without password confirmation', () => {
    inputEmail();
    inputPassword();

    submit();

    cy.get('#password-confirmation-input').parent().should('have.class', 'Mui-error');
    cy.get('.MuiFormHelperText-root.MuiFormHelperText-contained.Mui-error')
      .contains('Required').should('be.visible');
  });

  it('is invalid when passwords don\'t match', () => {
    inputEmail();
    inputPassword();
    inputPasswordConfirmation('fakeword');

    submit();

    cy.get('#password-input').parent().should('have.class', 'Mui-error');
    cy.get('#password-confirmation-input').parent().should('have.class', 'Mui-error');

    cy.get('.MuiFormHelperText-root.MuiFormHelperText-contained.Mui-error')
      .contains('Passwords do not match').should('be.visible');
  });
});
