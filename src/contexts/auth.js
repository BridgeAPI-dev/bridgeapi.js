import {
  createContext, useContext, useEffect,
} from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

import api from '../../utils/api';

const AuthContext = createContext({});

function AuthProvider({ children }) {
  const router = useRouter();

  // Sets the bearer token for future api requests on this page.
  // Helper function that enables us to fire off requests without
  // having the set the bearer token each time.
  useEffect(() => {
    async function loadUserFromCookies() {
      const token = Cookies.get('token');
      if (token) {
        api.defaults.headers.Authorization = `Bearer ${token}`;
      }
    }

    loadUserFromCookies();
  }, []);

  // Fires off an api request to fetch the JWT.
  // If it succeeds, token will be set in cookies & returns true,
  // otherwise returns false.
  const login = async (email, password) => {
    // const { data: token } = await api.post('/users/login', { email, password });
    // TODO: Replace hardcode with api request
    const token = '1234567890';
    if (token) {
      Cookies.set('token', token, { expires: 60 });
      api.defaults.headers.Authorization = `Bearer ${token.token}`;
      return true;
    }

    return false;
  };

  // Deletes cookie token & then redirects to login page
  const logout = () => {
    Cookies.remove('token');
    delete api.defaults.headers.Authorization;
    router.push('/users/login');
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated: !!Cookies.get('token'), login, logout,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;
