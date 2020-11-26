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
