// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
Cypress.Commands.add('stubRequest', (endpoint, method, statusCode, body) => {
  cy.intercept(method, endpoint, {
    statusCode,
    body,
  });
});

Cypress.Commands.add('setToken', () => {
  cy.setCookie('token', 'goodToken');
  cy.intercept('GET', '/user/valid', {
    statusCode: 200,
    body: {},
  });
});

Cypress.Commands.add('setBadToken', () => {
  cy.setCookie('token', 'badToken');
  cy.intercept('GET', '/user/valid', {
    statusCode: 401,
    body: {},
  });
});
