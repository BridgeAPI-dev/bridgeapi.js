/* eslint-disable cypress/no-unnecessary-waiting */
describe('Show bridge', () => {
  beforeEach(() => {
    cy.clearCookies();
  });

  afterEach(() => {
    cy.clearCookies();
  });

  it('redirects to login with bad token', () => {
    cy.setBadToken();
    cy.visit('/bridge/298347q9083274098');

    cy.location().should((location) => {
      expect(location.pathname).to.eq('/users/login');
    });
  });

  it('can display bridge values', () => {
    cy.setToken();
    cy.visit('/bridge/298347q9083274098');

    cy.get('#title').should('have.value', 'title_1');
    cy.get('#outboundUrl').should('have.value', 'c41a7126-a18c-4af6-880e-6857771a35c8.mock.pstmn.io/success_event');
    cy.get('#method').contains('POST').should('be.visible');
    cy.get('#retries').contains('3').should('be.visible');
    cy.get('#delay').contains('15 Minutes').should('be.visible');

    cy.get('#headers-0').should('have.value', 'X_API_KEY');
    cy.get('#headers-0-value').should('have.value', '$env.API_KEY');

    cy.get('#envVar-0').should('have.value', 'API_KEY');
    cy.get('#envVar-0-value').should('have.value', 'XXXX-XXX-XXXX');

    // TODO: Find way to test editor values
  });

  it('can delete headers', () => {
    cy.setToken();
    cy.visit('/bridge/298347q9083274098');
    cy.stubRequest('/headers/57', 'DELETE', 200, {});

    cy.wait(100);
    cy.get('#headers-trash-0').click();
    cy.wait(100);

    cy.get('#headers-0').should('not.exist');
    cy.get('#headers-0-value').should('not.exist');
    cy.get('#headers-trash-0').should('not.exist');
  });

  it('can put headers back into dom if request fails', () => {
    cy.setToken();
    cy.visit('/bridge/298347q9083274098');
    cy.stubRequest('/headers/57', 'DELETE', 400);

    cy.get('#headers-trash-0').click();

    cy.get('#headers-0').should('exist');
    cy.get('#headers-0-value').should('exist');
    cy.get('#headers-trash-0').should('exist');
    cy.get('#headers-0').should('have.value', 'X_API_KEY');
    cy.get('#headers-0-value').should('have.value', '$env.API_KEY');
  });

  it('can delete environment variables', () => {
    cy.setToken();
    cy.visit('/bridge/298347q9083274098');
    cy.stubRequest('/environment_variables/12', 'DELETE', 200, {});

    cy.wait(100);
    cy.get('#envVar-trash-0').click();
    cy.wait(100);

    cy.get('#envVar-0').should('not.exist');
    cy.get('#envVar-0-value').should('not.exist');
    cy.get('#envVar-trash-0').should('not.exist');
  });

  it('can put environment variables back into dom if request fails', () => {
    cy.setToken();
    cy.visit('/bridge/298347q9083274098');
    cy.stubRequest('/environment_variables/12', 'DELETE', 400, {});

    cy.get('#envVar-trash-0').click();

    cy.get('#envVar-0').should('exist');
    cy.get('#envVar-0-value').should('exist');
    cy.get('#envVar-trash-0').should('exist');
    cy.get('#envVar-0').should('have.value', 'API_KEY');
    cy.get('#envVar-0-value').should('have.value', 'XXXX-XXX-XXXX');
  });

  it('can save', () => {
    cy.setToken();
    cy.visit('/bridge/298347q9083274098');
    cy.stubRequest('/bridges', 'PATCH', 201, {});
    cy.wait(100);

    cy.get('#save-btn').click();
    cy.get('#success-alert').contains('Bridge has been saved.');
  });

  it('can deactive', () => {
    cy.setToken();
    cy.visit('/bridge/298347q9083274098');
    cy.stubRequest('/bridges/298347q9083274098/deactivate', 'PATCH', 201, {});
    cy.wait(100);

    cy.get('#actions-button').click();
    cy.get('#action-deactive').click();
    cy.get('#actions-warning-message').contains('Your bridge has been deactivated.');
  });

  it('can show error when deactiving fails', () => {
    cy.setToken();
    cy.visit('/bridge/298347q9083274098');
    cy.stubRequest('/bridges/298347q9083274098/deactivate', 'PATCH', 400, {});
    cy.wait(100);

    cy.get('#actions-button').click();
    cy.get('#action-deactive').click();
    cy.get('#actions-error-message').contains('Some error occurred. Please try again.');
  });

  it('can abort requests', () => {
    cy.setToken();
    cy.visit('/bridge/298347q9083274098');
    cy.stubRequest('/events/abort', 'PATCH', 200, {});
    cy.wait(100);

    cy.get('#actions-button').click();
    cy.get('#action-abort').click();
    cy.get('#actions-success-message').contains('Success! Your bridge has been updated.');
  });

  it('can show error when aborting fails', () => {
    cy.setToken();
    cy.visit('/bridge/298347q9083274098');
    cy.stubRequest('/events/abort', 'PATCH', 400, {});
    cy.wait(100);

    cy.get('#actions-button').click();
    cy.get('#action-abort').click();
    cy.get('#actions-error-message').contains('Some error occurred. Please try again.');
  });

  it('can delete', () => {
    cy.setToken();
    cy.visit('/bridge/298347q9083274098');
    cy.stubRequest('/bridges/298347q9083274098', 'DELETE', 200, {});
    cy.wait(100);

    cy.get('#actions-button').click();
    cy.get('#action-delete').click();
    cy.wait(100);
    cy.location().should((location) => {
      expect(location.pathname).to.eq('/dashboard');
    });
  });

  it('can show error when deleting fails', () => {
    cy.setToken();
    cy.visit('/bridge/298347q9083274098');
    cy.stubRequest('/bridges/298347q9083274098', 'DELETE', 400, {});
    cy.wait(100);

    cy.get('#actions-button').click();
    cy.get('#action-delete').click();
    cy.get('#actions-error-message').contains('Some error occurred. Please try again.');
  });
});
