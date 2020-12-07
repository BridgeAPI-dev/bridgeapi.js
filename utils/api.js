import Axios from 'axios';
import nookies from 'nookies';

const urls = {
  development: 'http://localhost:3001/',
  production: 'https://api.bridgeapi.dev',
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

// Helper function designed to be used with `getServerSideProps`.
// Handles fetching the token from cookies, firing off the api
// request and returning the data. Returns `false` if the token or
// or route was invalid.
//
// Usage:
//
// `if (!fetchSSRData(context)) { return { props: {} }}`
//
// *You can safely access the data retrieved from the api request*
export const fetchSSRData = async (context, endpoint) => {
  const { token } = nookies.get(context);
  const res = await api.get(endpoint, {
    headers: {
      'BRIDGE-JWT': token,
    },
  }).catch(() => false);

  return res;
};

export default api;
