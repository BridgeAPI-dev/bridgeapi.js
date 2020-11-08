// Immediately ends the requests & redirects to login page
const ssrRedirect = (context) => {
  context.res.statusCode = 302;
  context.res.setHeader('Location', '/users/login');
  context.res.end();
};

// Call this function during `getServerSideProps` to ensure
// a user is authenticated otherwise they will be redirected
// to the login page. Returns `true` if redirect will be occuring.
//
// Usage:
//
// `if (ssrRedirectUnlessToken(context)) { return { props: {} }}`
//
// *everything underneath is safe & can expect a JWT exists*
const ssrRedirectUnlessToken = (context) => {
  // TODO: Just checking if ANY cookies exist.
  // Need to ensure token actually exists SSR redirect if token doesn't exist
  if (!context.req.headers.cookie) {
    ssrRedirect(context);
    return true;
  }

  return false;
};

export { ssrRedirect, ssrRedirectUnlessToken };
