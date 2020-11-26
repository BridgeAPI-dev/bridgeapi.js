export const stubSuccessSignUp = () => {
  const response = {
    user: {
      email: 'demo@demo.com',
      notifications: false,
    },
  };
  cy.stubRequest('/user', 'POST', 201, response);
};

export const stubFailSignUp = () => {
  const response = {
    error: 'email or password is invalid',
  };
  cy.stubRequest('/user', 'POST', 422, response);
};

export const stubSuccessLogin = () => {
  const response = {
    token: '123984790182347',
  };
  cy.stubRequest('/login', 'POST', 201, response);
};

export const stubFailLogin = () => {
  const response = {
    token: '123984790182347',
  };
  cy.stubRequest('/login', 'POST', 422, response);
};

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
