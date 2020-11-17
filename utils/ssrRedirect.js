import nookies from 'nookies';
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
  if (!nookies.get(context).token) {
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
  // Ensure a token exists otherwise don't waste our time on an api request
  if (ssrRedirectUnlessToken(context)) { return false; }

  const { token } = nookies.get(context);
  const res = await api.get(endpoint, {
    headers: {
      'BRIDGE-JWT': token,
    },
  }).catch(() => false);

  // Return the response if we are not unauthorized
  if (res && res.status !== 401) {
    return res;
  }

  // Redirect to login page since the token is fake, expired or user is deleted
  ssrRedirect(context);
  return false;
};

export default fetchDataOrRedirect;
