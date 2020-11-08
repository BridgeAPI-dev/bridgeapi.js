const redirect = (context) => {
  context.res.statusCode = 302;
  context.res.setHeader('Location', '/users/login');
  context.res.end();
};

const redirectUnlessToken = (context) => {
  // TODO: Just checking if a cookie exist. Need to ensure token actually exists
  // SSR redirect if token doesn't exist
  if (!context.req.headers.cookie) {
    redirect(context);
    return true;
  }

  return false;
};

export { redirect, redirectUnlessToken };
