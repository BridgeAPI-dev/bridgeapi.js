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

export const stubCreateSuccessfullBridge = () => {
  const response = {
    id: '1',
  };
  cy.stubRequest('/bridges', 'POST', 201, response);
};

export const stubCreateFailedBridge = () => {
  const response = {
    error: 'some error message',
  };
  cy.stubRequest('/bridges', 'POST', 400, response);
};

export const stubUpdateSuccessBridge = () => {
  cy.stubRequest('/bridges/1', 'PATCH', 200);
};

export const stubFailUpdateBridge = () => {
  cy.stubRequest('/bridge/1', 'PATCH', 400);
};
