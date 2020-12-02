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
  const input = url || 'www.outboundurl.com';
  cy.get('#outboundUrl').type(input).should('have.value', input);
};

export const inputMethod = (methodName) => {
  const input = methodName || 'GET';
  cy.get('#method').click().then(() => {
    cy.get(`[data-value="${input}"]`).click().then(() => {
      cy.get('#method').invoke('text').should('eq', input);
    });
  });
};

export const inputRetries = (retries) => {
  const input = retries || '3';
  cy.get('#retries').click().then(() => {
    cy.get(`[data-value="${3}"]`).click().then(() => {
      cy.get('#retries').invoke('text').should('eq', input);
    });
  });
};

export const inputDelay = (delay) => {
  const input = delay || '30';
  cy.get('#delay').click().then(() => {
    cy.get(`[data-value="${input}"]`).click().then(() => {
      cy.get('#delay').invoke('text').should('eq', `${input} Minutes`);
    });
  });
};

export const inputHeaderKey = (headerKey) => {
  const input = headerKey || 'Key';
  // cy.get('#headerPlusBtn').click().then(() => {
  cy.get('#headers-0').type(input).should('have.value', input);
  // });
};

export const inputHeaderValue = (headerValue) => {
  const input = headerValue || 'Value';
  // cy.get('#headerPlusBtn').click().then(() => {
  cy.get('#headers-0-value').type(input).should('have.value', input);
  // });
};

export const inputHeaderPairs = () => {
  cy.get('#headerPlusBtn').click();
  inputHeaderKey();
  inputHeaderValue();
};

export const inputEnvVarKey = (envKey) => {
  const input = envKey || 'Key';
  cy.get('#envVar-0').type(input).should('have.value', input);
};

export const inputEnvVarValue = (envValue) => {
  const input = envValue || 'Value';
  cy.get('#envVar-0-value').type(input).should('have.value', input);
};

// export const inputPayload = (payload) => {
//   const input = payload || "{ 'hello': 'world' }";
//   // const input = payload || defaultPayload;
//   cy.get('#payload').type(input).should('have.value', input);
// };

// export const inputTestPayload = (testPayload) => {
//   const input = testPayload || "{ 'hello': 'world' }";
//   // const input = testPayload || defaultPayload;
//   cy.get('#test-payload').type(input).should('have.value', input);
// };

export const inputHeaderFields = () => (
) => {
  inputTitle();
  inputOutboundUrl();
  inputMethod();
  inputRetries();
  inputDelay();
  inputHeaderPairs();
};

export const inputEnvFields = () => {
  cy.get('#envPlusBtn').click();
  inputEnvVarKey();
  inputEnvVarValue();
};

export const inputHeaderFieldsInvalidUrl = () => {
  inputTitle();
  inputOutboundUrl('invalidUrl');
  inputMethod();
  inputRetries();
  inputDelay();
  inputHeaderPairs();
  // inputHeaderKey();
  // inputHeaderValue();
};

export const inputHeaderFieldsInvalidTitle = () => {
  inputTitle('ab');
  inputOutboundUrl();
  inputMethod();
  inputRetries();
  inputDelay();
  inputHeaderPairs();
  // inputHeaderKey();
  // inputHeaderValue();
};

export const inputInvalidPayload = (value) => {
  const input = value || 'invalidPayload';
  cy.get('div.MuiGrid-root.jss1.MuiGrid-container.MuiGrid-spacing-xs-5.MuiGrid-item.MuiGrid-grid-sm-9.MuiGrid-grid-md-10 > div > form > div:nth-child(4) > div.MuiCollapse-container.MuiCollapse-entered > div > div > div > div > div > div:nth-child(3) > div > div > div.CodeMirror-scroll > div.CodeMirror-sizer > div > div > div > div.CodeMirror-code > div:nth-child(2) > pre > span > span:nth-child(2)').type(input);
};
