import { stubSuccessfullCreateBridge, stubFailedCreateBridge, stubSuccessLogin } from '../../../support/utils/stubs';

import {
  inputTitle,
  inputOutboundUrl,
  inputMethod,
  inputRetries,
  inputDelay,
  inputHeaderFields,
  inputHeaderKey,
  inputHeaderValue,
  inputEnvFields,
  inputEnvVarKey,
  inputEnvVarValue,
  inputPayloadFields,
  inputPayload,
  inputTestPayload,
  submit,
} from '../../../support/utils/inputs';

describe('Create a new bridge', () => {
  beforeEach(() => {
    cy.clearCookies();
  });
  afterEach(() => {
    cy.clearCookies();
  });

  //  TEST FOR bridge/[id]
  // it('redirects to login with bad token', () => {
  //   cy.setBadToken();
  //   cy.visit('/bridge/new');

  //   cy.location().should((location) => {
  //     expect(location.pathname).to.eq('/users/login');
  //   });
  // });

  it.skip('displays all error messages upon empty submission', () => { // PASSES
    cy.setToken();
    cy.visit('/bridge/new');
    cy.get('#save-btn').click();
    cy.get('#save-btn').click();
    cy.get('#title-helper-text').contains('Required');
    cy.get('#outboundUrl-helper-text').contains('Required');
    cy.get('#method-helper-text').contains('Required');
    cy.get('#retries-helper-text').contains('Required');
    cy.get('#delay-helper-text').contains('Required');
  });

  it.skip('returns an error message if an error submission occurred', () => { // PASSES
    cy.setToken();
    cy.visit('/bridge/new');
    inputHeaderFields();
    inputEnvFields();
    cy.get('#save-btn').click();
    cy.get('#save-btn').click();
    cy.get('#error-alert').contains('Some error has occurred. Please try again.');
  });

  it('can create a new bridge', () => { // Problem: goes to login page and times out
    stubSuccessfullCreateBridge();
    cy.setToken();
    cy.visit('/bridge/new');
    inputHeaderFields();
    inputEnvFields();
    cy.get('#save-btn').click();
    cy.get('#save-btn').click();
    cy.location().should((location) => {
      expect(location.pathname).to.eq('/bridges/1');
    });
    // cy.get('#success-alert').contains('A Bridge has been saved.');
    // cy.get('.MuiAlert-message').contains('Bridge has been saved.');
  });

  // it('redirects upon successful submission', () => {
  //   cy.setToken();
  //   cy.visit('/bridge/new');
  //   inputHeaderFields();
  //   inputEnvFields();
  //   submit();
  //   cy.location().should((location) => {
  //     expect(location.pathname).to.eq('/bridges/login');
  //   });
  //   // TEST LOCATION: router.push(`/bridge/${res.data.id}`))
  // });
});

// ?:
// Test happy path?


//  TESTS
// test with incorrect values (test validations) at each field
// - redirection with getServerSideProps on Bridge/new.js not working properly
// - how to set payloads?
  // - Test Set form input values 
// - test success
