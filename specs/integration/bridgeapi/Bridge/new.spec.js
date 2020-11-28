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

  // it('redirects to login with bad token', () => {
  //   cy.setBadToken();
  //   cy.visit('/bridge/new');

  //   cy.location().should((location) => {
  //     expect(location.pathname).to.eq('/users/login');
  //   });
  // });

  it('can create a new bridge', () => {
    // stubSuccessLogin();
    cy.setToken();
    cy.visit('/bridge/new');
    inputHeaderFields();
    inputEnvFields();
    submit();
  });

  // it('displays all error messages upon empty submission', () => {
  //   cy.setToken();
  //   cy.visit('/bridge/new');
  //   submit();
  //   TEST ALL ERROR MESSAGES
  // });
});

//  TESTS
// create with no values -> test all error messages / alerts
// test with incorrect values (test validations) at each field
// Test redirect path after submission
// Test that new bridge exists after submission

// ?:
// - redirection with getServerSideProps on Bridge/new.js
// - how to set payloads
// - Response to succesfull submit
// -
