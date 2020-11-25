/// <reference types="cypress" />

describe('Sign Up', () => {
  beforeEach(() => {
    cy.visit('/users/signup');
  });

  // context('' () => {

  // })
  it('is true', () => {
    expect(true).to.equal(true);
  });
});
