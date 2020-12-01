// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from 'msw';

const bridges = require('../../fixtures/bridges.json');
<<<<<<< HEAD
const bridge = require('../../fixtures/bridge.json');
=======
const event = require('../../fixtures/event.json');
const user = require('../../fixtures/user.json');
>>>>>>> 4683017abea59d04f6d7abb0e3757c185459d0a8

// msw doesn't give us a way to stub requests on a per spec basis. Because
// of this, we need to make our own way. Use `cy.setToken` to create a
// token that will be valid. Use `cy.setBadToken` to create an invalid token.
// Note: You will not be able to use cy.visit in a `beforeEach` if you want
// to use both valid & invalid tokens in a test suite as you must set cookies
// prior to visiting.
const invalidToken = (req) => req.headers.map['bridge-jwt'] === 'badToken';

const handlers = [
  rest.get('http://localhost/bridges', (req, res, ctx) => {
    if (invalidToken(req)) {
      return res(
        ctx.status(401),
        ctx.json(
          {},
        ),
      );
    }

    return res(ctx.json(bridges));
  }),
<<<<<<< HEAD
  rest.get('http://localhost/bridges/1', (req, res, ctx) => {
=======

  rest.get('http://localhost/events/26', (req, res, ctx) => {
    if (invalidToken(req)) {
      return res(
        ctx.status(401),
        ctx.json(
          {},
        ),
      );
    }

    return res(ctx.json(event));
  }),

  rest.get('http://localhost/user', (req, res, ctx) => {
>>>>>>> 4683017abea59d04f6d7abb0e3757c185459d0a8
    if (invalidToken(req)) {
      return res(
        ctx.status(401),
        ctx.json(
          {},
        ),
      );
    }

<<<<<<< HEAD
    return res(ctx.json(bridge));
=======
    return res(ctx.json(user));
>>>>>>> 4683017abea59d04f6d7abb0e3757c185459d0a8
  }),
];

export default handlers;
