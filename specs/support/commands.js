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
<<<<<<< HEAD:cypress/support/commands.js

Cypress.Commands.add('stubRequest', (url, method, status, response) => {
  cy.server();
  cy.route({
    url,
    method,
    status,
    response,
  });
});
=======
Cypress.Commands.add('stubRequest', (endpoint, method, statusCode, body) => {
  cy.intercept(method, endpoint, {
    statusCode,
    body,
  });
});

Cypress.Commands.add('setToken', () => {
  cy.setCookie('token', 'goodToken');
});

Cypress.Commands.add('setBadToken', () => {
  cy.setCookie('token', 'badToken');
});
>>>>>>> e5e318050b2b85121bf9a39cdd34d1635835df9a:specs/support/commands.js
