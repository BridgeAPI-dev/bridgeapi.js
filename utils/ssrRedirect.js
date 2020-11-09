import { parseCookies, setCookie, destroyCookie } from 'nookies';
import api from './api';

// Immediately ends the requests & redirects to login page
const ssrRedirect = (context) => {
  context.res.statusCode = 302;
  context.res.setHeader('Location', '/users/login');
  context.res.end();
};

// Called during `getServerSideProps` to ensure
// a user is authenticated otherwise they will be redirected
// to the login page. Returns `true` if redirect will be occuring.
const ssrRedirectUnlessToken = (context) => {
  // TODO: Just checking if ANY cookies exist.
  // Need to ensure token actually exists SSR redirect if token doesn't exist
  if (!context.req.headers.cookie) {
    ssrRedirect(context);
    return true;
  }

  return false;
};

// Call this function during `getServerSideProps` to ensure
// a user is authenticated & retrieve the particular data a page needs
// if the user is not authenticated, they will be redirected
// to the login page. Returns `false` if redirect will be occuring.
//
// Usage:
//
// `if (!fetchDataOrRedirect(context)) { return { props: {} }}`
//
// *You can safely access the data retrieved from the api request*
const fetchDataOrRedirect = async (context, endpoint) => {
  // Ensure a token exists otherwise don't waste our time on
  // an api request
  if (ssrRedirectUnlessToken(context)) { return false; }

  const cookies = parseCookies(context);
  const res = await api.get(endpoint, {
    headers: {
      'BRIDGE-JWT': cookies.token,
    },
  });

  // Return the response if the token exists & is valid
  if (res.status === 200) {
    return res;
  }

  // If the token was fake or expired, redirect to login page
  ssrRedirect(context);
  return false;
};

export default fetchDataOrRedirect;
