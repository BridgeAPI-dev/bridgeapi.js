import { stubSuccessfullCreateBridge } from '../../../support/utils/stubs';

import {
  // inputHeaderFields,
  inputHeaderFieldsInvalidTitle,
  inputHeaderFieldsInvalidUrl,
  inputEnvFields,
  inputInvalidPayload,
  inputOutboundUrl,
  inputTitle,
  inputMethod,
  inputRetries,
  inputDelay,
  inputHeaderPairs,
} from '../../../support/utils/inputs';

const inputHeaderFields = () => (
) => {
  inputTitle();
  inputOutboundUrl();
  inputMethod();
  inputRetries();
  inputDelay();
  inputHeaderPairs();
};

describe('Create a new bridge', () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.setToken();
    cy.visit('/bridge/new');
  });
  afterEach(() => {
    cy.clearCookies();
  });

  it.skip('displays all error messages upon submission of empty fields', () => { // PASSES
    cy.get('#save-btn').click();
    cy.get('#save-btn').click();
    cy.get('#title-helper-text').contains('Required');
    cy.get('#outboundUrl-helper-text').contains('Required');
    cy.get('#method-helper-text').contains('Required');
    cy.get('#retries-helper-text').contains('Required');
    cy.get('#delay-helper-text').contains('Required');
  });

  it.skip('returns an error message if an error submission occurred', () => { // PASSES
    cy.wait(100);
    inputHeaderFields();
    inputEnvFields();
    cy.get('#save-btn').click();
    cy.get('#save-btn').click();
    cy.get('#error-alert').contains('Some error has occurred. Please try again.');
  });

  it.skip('can create a new bridge', () => {
    stubSuccessfullCreateBridge();
    cy.wait(1000); // Sometimes editor takes a second to load..
    inputHeaderFields();
    inputEnvFields();
    cy.get('#save-btn').click();

    cy.wait(100);
    cy.get('#success-alert').contains('Bridge has been saved.');
    cy.location().should((location) => {
      expect(location.pathname).to.eq('/bridge/1');
    });
  });

  it.skip('gives url validation error if invalid url', () => {
    inputHeaderFieldsInvalidUrl();
    inputEnvFields();
    cy.get('#save-btn').click();
    cy.wait(100);
    cy.get('#outboundUrl-helper-text').contains('Invalid URL');
  });

  it.skip('gives title validation error if too short title (< 2 chars)', () => {
    inputHeaderFieldsInvalidTitle();
    inputEnvFields();
    cy.get('#save-btn').click();
    cy.get('#title-helper-text').contains('Title must be at least 3 characters long');
  });

  it.skip('gives validation error if invalid payload', () => {
    // stubSuccessfullCreateBridge();
    cy.wait(100);
    inputHeaderFields();
    // cy.pause();
    inputEnvFields();
    inputInvalidPayload();
    cy.get('#save-btn').click();

    // cy.get('#title-helper-text').contains('Title must be at least 3 characters long');
  });

  // it.skip('gives validation error if invalid payload', () => {
  //   // stubSuccessfullCreateBridge();
  //   cy.wait(100);
  //   inputHeaderFields();
  //   // cy.pause();
  //   inputEnvFields();
  //   inputInvalidTestPayload();
  //   cy.get('#save-btn').click();

  //   // cy.get('#title-helper-text').contains('Title must be at least 3 characters long');
  // });

  it.skip('can do something', () => {
    // stubSuccessfullCreateBridge();
    // cy.wait(1000); // Sometimes editor takes a second to load..
    // stubSuccessfullCreateBridge();
    // inputTitle();
    // inputOutboundUrl();
    // inputInvalidPayload();
    cy.wait(100);
    inputHeaderFields();
    // inputEmail();
    // inputEnvFields();
    // cy.get('#save-btn').click();

    // cy.wait(100);
    // cy.get('#success-alert').contains('Bridge has been saved.');
    // cy.location().should((location) => {
    //   expect(location.pathname).to.eq('/bridge/1');
    // });
  });
});
