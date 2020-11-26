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
  cy.get('#outboundUrl').type(input).should('have.value', input);
};
