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

// This is a client side route protection component.
//
// Returns `LoadingScreen` if `useAuth` is `loading`.
// Returns `children` if `isAuthenticated` is `true`.
// If `isAuthenticated` returns `false` then redirect
// to `/users/login` & display the login page.
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

  if (loading) return <LoadingScreen />;

  if (isAuthenticated) return children;

  if (typeof window !== 'undefined') router.push('/users/login');

  return <LoadingScreen />;
}

export default ProtectRoute;

ProtectRoute.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
