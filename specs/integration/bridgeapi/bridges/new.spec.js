/* eslint-disable cypress/no-unnecessary-waiting */
import { stubSuccessfullCreateBridge, stubFailedCreateBridge } from '../../../support/utils/stubs';

import {
  inputHeaderFields,
  inputHeaderFieldsInvalidTitle,
  inputHeaderFieldsInvalidUrl,
  inputEnvFields,
  inputInvalidPayload,
  inputInvalidTestPayload,
} from '../../../support/utils/inputs';

describe('Create a new bridge', () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.setToken();
    cy.visit('/bridge/new');
  });

  afterEach(() => {
    cy.clearCookies();
  });

  it('displays all error messages upon submission of empty fields', () => {
    cy.get('#save-btn').click();

    cy.get('#title-helper-text').contains('Required');
    cy.get('#outboundUrl-helper-text').contains('Required');
    cy.get('#method-helper-text').contains('Required');
    cy.get('#retries-helper-text').contains('Required');
    cy.get('#delay-helper-text').contains('Required');
  });

  it('returns an error message if an error submission occurred', () => {
    stubFailedCreateBridge();
    cy.wait(100);
    inputHeaderFields();
    inputEnvFields();
    cy.get('#save-btn').click();

    cy.get('#error-alert').contains('Some error has occurred. Please try again.');
  });

  it('can create a new bridge', () => {
    stubSuccessfullCreateBridge();
    cy.wait(1000); // Sometimes editor takes a second to load..
    inputHeaderFields();
    inputEnvFields();
    cy.get('#save-btn').click();

    cy.wait(100);
    cy.get('#success-alert').contains('Bridge has been saved.');
    cy.location().should((location) => {
      expect(location.pathname).to.eq('/bridge/298347q9083274098');
    });
  });

  it('gives url validation error if invalid url', () => {
    inputHeaderFieldsInvalidUrl();
    inputEnvFields();
    cy.get('#save-btn').click();
    cy.wait(100);
    cy.get('#outboundUrl-helper-text')
      .contains('Invalid URL');
  });

  it('gives title validation error if too short title (< 2 chars)', () => {
    inputHeaderFieldsInvalidTitle();
    inputEnvFields();
    cy.get('#save-btn').click();
    cy.get('#title-helper-text')
      .contains('Title must be at least 3 characters long');
  });

  it('gives validation error if invalid payload', () => {
    cy.wait(100);
    inputHeaderFields();
    inputEnvFields();
    inputInvalidPayload();
    cy.get('#save-btn').click();
    cy.wait(100);
    cy.get('#error-alert')
      .contains('Invalid JSON for Payload editor')
      .should('be.visible');
  });

  it('gives validation error if invalid testPayload', () => {
    cy.wait(100);
    inputHeaderFields();
    inputEnvFields();
    inputInvalidTestPayload();
    cy.get('#save-btn').click();
    cy.wait(100);
    cy.get('#error-alert')
      .contains('Invalid JSON for Test Payload editor')
      .should('be.visible');
  });

  it('gives validation errors for both payloads if both are invalid', () => {
    cy.wait(100);
    inputHeaderFields();
    inputEnvFields();
    inputInvalidPayload();
    inputInvalidTestPayload();
    cy.get('#save-btn').click();
    cy.wait(100);
    cy.get('#error-alert')
      .contains('Invalid JSON for Payload and Test Payload editors')
      .should('be.visible');
  });
});
