/* eslint-disable cypress/no-unnecessary-waiting */
/// <reference types="cypress" />

import {
  inputPassword,
  submit,
} from '../../../support/utils/inputs';

const stubSuccessAccount = () => {
  cy.stubRequest('/user', 'PATCH', 200, {});
};

const stubFailAccount = () => {
  const response = {
    error: 'some error message',
  };
  cy.stubRequest('/user', 'PATCH', 400, response);
};

const stubSuccessDeleteAccount = () => {
  cy.stubRequest('/user', 'DELETE', 200, {});
};

const stubFailDeleteAccount = () => {
  const response = {
    error: 'some error message',
  };
  cy.stubRequest('/user', 'DELETE', 400, response);
};

const inputNewPassword = (pw) => {
  const input = pw || 'password';

  cy.get('#new-password-input')
    .type(input).should('have.value', input);
};

const inputNewPasswordConfirmation = (pw) => {
  const input = pw || 'password';

  cy.get('#new-password-confirmation-input')
    .type(input).should('have.value', input);
};

const inputNewPasswords = (pw, pwc) => {
  inputNewPassword(pw);
  inputNewPasswordConfirmation(pwc);
};

describe('Account page', () => {
  afterEach(() => {
    cy.clearCookies();
  });

  it('redirects to login with bad token', () => {
    cy.setBadToken();
    cy.visit('/users/account');

    cy.location().should((location) => {
      expect(location.pathname).to.eq('/users/login');
    });
  });

  it('requires password for submition', () => {
    cy.setToken();
    cy.visit('/users/account');

    submit();
    cy.get('#password-input')
      .parent()
      .should('have.class', 'Mui-error');
  });

  it('has an active checkbox', () => {
    cy.setToken();
    cy.visit('/users/account');

    cy.get('#notifications-checkbox')
      .should('be.checked');
  });

  it('can submit a new password', () => {
    stubSuccessAccount();
    cy.setToken();
    cy.visit('/users/account');

    inputPassword();
    inputNewPasswords();
    submit();

    cy.wait(250);

    cy.get('#success-message')
      .contains('Account info has been updated.')
      .should('be.visible');
  });

  it('can show error message on failed submittion', () => {
    stubFailAccount();
    cy.setToken();
    cy.visit('/users/account');

    inputPassword();
    inputNewPasswords();
    submit();

    cy.wait(250);

    cy.get('#error-message')
      .contains('Some error occurred. Please try again later.')
      .should('be.visible');
  });

  it('requires passwords to match', () => {
    stubFailAccount();
    cy.setToken();
    cy.visit('/users/account');

    inputPassword();
    inputNewPasswords('password', 'passowrd');
    submit();

    cy.get('#new-password-input')
      .parent()
      .should('have.class', 'Mui-error');

    cy.get('#new-password-confirmation-input')
      .parent()
      .should('have.class', 'Mui-error');
  });

  it('can open and close modal', () => {
    cy.setToken();
    cy.visit('/users/account');

    cy.get('#open-modal-button')
      .click();

    cy.get('#delete-account-modal')
      .should('be.visible');

    cy.get('#cancel-button')
      .click();

    cy.wait(250);

    cy.get('#delete-account-modal')
      .should('not.exist');
  });

  it('can delete account', () => {
    stubSuccessDeleteAccount();
    cy.setToken();
    cy.visit('/users/account');

    cy.get('#open-modal-button')
      .click();

    cy.get('#delete-account-modal')
      .should('be.visible');

    cy.get('#delete-account-button')
      .click();

    cy.wait(250);

    cy.get('#modal-success-message')
      .contains('Account has been deleted. Redirecting...')
      .should('be.visible');

    cy.wait(1000);

    cy.location().should((location) => {
      expect(location.pathname).to.eq('/users/login');
    });
  });

  it('can delete account', () => {
    stubFailDeleteAccount();
    cy.setToken();
    cy.visit('/users/account');

    cy.get('#open-modal-button')
      .click();

    cy.get('#delete-account-modal')
      .should('be.visible');

    cy.get('#delete-account-button')
      .click();

    cy.wait(250);

    cy.get('#modal-error-message')
      .contains('Some error occurred. Please try again later.')
      .should('be.visible');

    cy.location().should((location) => {
      expect(location.pathname).to.eq('/users/account');
    });
  });
});
