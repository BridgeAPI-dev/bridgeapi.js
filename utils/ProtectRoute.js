import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../src/contexts/auth';
import Login from '../pages/users/login';

function ProtectRoute({ children }) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    debugger;
    // Incase we forget to redirect in getServerSideProps
    if (isAuthenticated) return;

    router.push('/users/login');
  }, []);

  return isAuthenticated ? (children) : (<Login />);
}

export default ProtectRoute;
