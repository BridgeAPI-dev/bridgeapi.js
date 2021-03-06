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

export const stubSuccessfullCreateBridge = () => {
  const response = {
    slug: '298347q9083274098',
  };
  cy.stubRequest('/bridges', 'POST', 201, response);
};

export const stubFailedCreateBridge = () => {
  const response = {
    error: 'Some error has occurred. Please try again.',
  };
  cy.stubRequest('/bridges', 'POST', 400, response);
};

export const stubUpdateSuccessBridge = () => {
  cy.stubRequest('/bridges/298347q9083274098', 'PATCH', 200);
};

export const stubFailUpdateBridge = () => {
  cy.stubRequest('/bridges/298347q9083274098', 'PATCH', 400);
};
