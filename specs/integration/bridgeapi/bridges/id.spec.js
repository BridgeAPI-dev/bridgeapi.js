describe('Show bridge', () => {
  beforeEach(() => {
    // cy.setToken();
    cy.clearCookies();
  });

  // afterEach(() => {
  // cy.clearCookies();
  // });

  it.skip('redirects to login with bad token', () => {
    cy.setBadToken();
    cy.visit('/bridge/1');

    cy.location().should((location) => {
      expect(location.pathname).to.eq('/users/login');
    });
  });

  it('Show the bridge', () => {
    cy.setToken();
    cy.visit('/bridge/1');
  });
});
