import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useAuth } from '../src/contexts/auth';
import Loader from '../components/Loader';

const LoadingScreen = () => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    height: '100vh',
    overflow: 'hidden',
  }}
  >
    <Loader />
  </div>
);

// This is a client side route protection.
//
// It will return the children of the page if `isAuthenticated`
// returns true. It will do a push of the URL to `/users/login`
// & display the login page if `isAuthenticated` returns false.
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
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  if (isAuthenticated) {
    return children;
  }

  if (typeof window !== 'undefined') {
    console.log('pushhhh');
    router.push('/users/login');
  }

  return <LoadingScreen />;
}

export default ProtectRoute;

ProtectRoute.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
