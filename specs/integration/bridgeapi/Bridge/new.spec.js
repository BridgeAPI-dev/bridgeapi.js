const stubCreateSuccessBridge = () => {
  cy.stubRequest('/bridge', 'POST', 201, whateverYouWantReturned)
}

const stubFailCreateBridge = () => {
  cy.stubRequest('/bridge', 'POST', 400, )
}

const stubUpdateSuccessBridge = () => {
  cy.stubRequest('/bridge', 'PATCH', 200, whateverYouWantReturned)
}

const stubFailUpdateBridge = () => {
  cy.stubRequest('/bridge', 'PATCH', )
}