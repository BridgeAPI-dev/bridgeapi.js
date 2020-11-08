import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../src/contexts/auth';
import Login from '../pages/users/login';

// This is a CSR route protection.
//
// It will return the children of the page if `isAuthenticated`
// returns true. It will do a shallow push of the URL to `/users/login`
// & display the login page is `isAuthenticated` returns false.
// Realistically, we will be redirecting in the `getServerSideProps` phase
// if the user is not authenticated. This is more of a last resort.
//
// Usage:
//
// Wrap your protected page with:
//
// <ProtectRoute>
//   *My Page*
// </ProtectRoute>
function ProtectRoute({ children }) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  // Incase we forget to redirect in getServerSideProps
  useEffect(() => {
    if (!isAuthenticated) { router.push('/users/login'); }
  }, []);

  // If window is not defined, return the page to
  // prevent `Expected server HTML to contain a matching` warning.
  if (typeof window === 'undefined') {
    return children;
  }

  // Note: If this actually does return `<Login />`,
  // a `Expected server HTML to contain a matching` warning will
  // be thrown because the SSR HTML & CSR HTML won't match.
  // This is only a last resort though. User's *should* be redirected
  // during the `getServerSideProps` phase.
  return isAuthenticated ? (children) : (<Login />);
}

export default ProtectRoute;
