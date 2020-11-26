export const inputEmail = (email) => {
  const input = email || 'demo@demo.com';

  cy.get('#email-input')
    .type(input).should('have.value', input);
};

export const inputPassword = (pw) => {
  const input = pw || 'password';

  cy.get('#password-input')
    .type(input).should('have.value', input);
};

export const inputPasswordConfirmation = (pwc) => {
  const input = pwc || 'password';

  cy.get('#password-confirmation-input')
    .type(input).should('have.value', input);
};

export const inputSignUpFields = (email, pw, pwc) => {
  inputEmail(email);
  inputPassword(pw);
  inputPasswordConfirmation(pwc);
};

export const inputLoginFields = (email, pw) => {
  inputEmail(email);
  inputPassword(pw);
};

export const submit = () => {
  cy.get('form').submit();
};

export const inputTitle = (title) => {
  const input = title || 'Bridge Title';
  cy.get('#title').type(input).should('have.value', input);
};

export const inputOutboundUrl = (url) => {
  const input = url || 'Outbound URL';
  cy.get('#outboundUrl').type(input).should('have.value', input);
};

export const inputMethod = (methodName) => {
  const input = methodName || 'Method';
  cy.get('#method').type(input).should('have.value', input);
};

export const inputRetries = (retries) => {
  const input = retries || 'Retries';
  cy.get('#retries').type(input).should('have.value', input);
};

export const inputDelay = (delay) => {
  const input = delay || 'Delay';
  cy.get('#delay').type(input).should('have.value', input);
};

export const inputHeaderKey = (headerKey) => {
  const input = headerKey || 'Key';
  cy.get('#headers-0').type(input).should('have.value', input);
};

export const inputHeaderValue = (headerValue) => {
  const input = headerValue || 'Value';
  cy.get('#headers-0-value').type(input).should('have.value', input);
};

export const inputEnvVarKey = (envKey) => {
  const input = envKey || 'Key';
  cy.get('#envVar-0').type(input).should('have.value', input);
};

export const inputEnvVarValue = (envValue) => {
  const input = envValue || 'Value';
  cy.get('#envVar-0-value').type(input).should('have.value', input);
};

const defaultPayload = {
  hello: 'world',
  acessEnvVars: '$env.MY_KEY',
  accessPayload: '$payload.message',
};

export const inputPayload = (payload) => {
  const input = payload || defaultPayload;
  cy.get('#payload').type(input).should('have.value', input);
};

export const inputTestPayload = (testPayload) => {
  const input = testPayload || defaultPayload;
  cy.get('#test-payload').type(input).should('have.value', input);
};
