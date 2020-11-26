import { rest } from 'msw';
// import users from 'data/users'; // contains mock data for users
// import messages from 'data/messages';// contains mock data for messages

const handlers = [
  rest.get('http://localhost:3001/bridges', (req, res, ctx) => res(ctx.json([]))),
];

export default handlers;
