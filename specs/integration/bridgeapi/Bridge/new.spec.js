import { stubSuccessfullCreateBridge, stubFailedCreateBridge } from '../../../support/utils/stubs';

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
    cy.visit('/bridge/new');
  });
  afterEach(() => {
    cy.clearCookies();
  });
  it('can create a new bridge', () => {
    inputHeaderFields();
    inputEnvFields();
    inputPayloadFields();
    submit();
    // stubSuccessfullCreateBridge();
  });
});
