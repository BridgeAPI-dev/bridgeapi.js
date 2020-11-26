import Axios from 'axios';

const urls = {
  development: 'http://localhost:3001/',
  production: 'http://localhost:3004/',
};

// Tests require the application to be built and
// ran with `npm run start` which ALWAYS sets the
// NODE_ENV to `production`. NEXT_PUBLIC_TEST_ENV
// is designed to be used in a test environment.
// This ternary was a solution for tests without
// making breaking changes to dev/production behavior.
const url = process.env.NEXT_PUBLIC_TEST_ENV
  ? ''
  : urls[process.env.NODE_ENV];

const api = Axios.create({
  baseURL: url,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default api;
