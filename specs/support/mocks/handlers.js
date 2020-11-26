// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from 'msw';

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

    return res(
      ctx.json(
        { bridges: [] },
      ),
    );
  }),
];

export default handlers;
