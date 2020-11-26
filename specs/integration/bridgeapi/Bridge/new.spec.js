import { stubSuccessfullCreateBridge, stubFailedCreateBridge } from '../../support/utils/stubs';

import {
  inputTitle,
  inputOutboundUrl,
  inputMethod,
  inputRetries,
  inputDelay,
  inputHeaderKey,
  inputHeaderValue,
  inputEnvVarKey,
  inputEnvVarValue,
  inputPayload,
  inputTestPayload,
  submit,
} from '../../support/utils/inputs';

describe('Create a new bridge', () => {
  beforeEach(() => {
    cy.visit('/bridges/new');
  });
  afterEach(() => {
    cy.clearCookies();
  });
  it('can create a new bridge', () => {
    stubSuccessfullCreateBridge();
  });
});
