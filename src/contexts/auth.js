import {
  createContext, useContext, useEffect, useState,
} from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

import api from '../../utils/api';

const AuthContext = createContext({});

function AuthProvider({ children }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Sets the JWT in headers for future api requests on the current page.
  // Helper function that enables us to fire off requests without
  // having the set the header token each time.
  useEffect(() => {
    async function loadUserFromCookies() {
      const token = Cookies.get('token');
      const res = await api.get('/user/valid', {
        headers: {
          'BRIDGE-JWT': token,
        },
      }).catch(() => false);

      if (res && res.status === 200) {
        setIsAuthenticated(true);
        setTimeout(() => setLoading(false), 100);
        api.defaults.headers['BRIDGE-JWT'] = token;
      }

      setLoading(false);
    }

    loadUserFromCookies();
  }, []);

  // Fires off an api request to fetch the JWT.
  // If it succeeds, token will be set in cookies & returns true, otherwise returns false.
  // Accessible through the `useAuth` hook.
  const login = async (email, password) => {
    const res = await api.post(
      '/login',
      { user: { email, password } },
    ).catch((error) => ({ error, data: {} })); // Prevent error when fetching for token

    const { token } = res.data;

    if (token) {
      Cookies.set('token', token, { expires: 60, path: '/', sameSite: 'strict' });
      api.defaults.headers['BRIDGE-JWT'] = token;
      setIsAuthenticated(true);

      return true;
    }

    return false;
  };

  // Deletes cookie token & then redirects to login page.
  // Accessible through the `useAuth` hook.
  const logout = () => {
    Cookies.remove('token');
    delete api.defaults.headers['BRIDGE-JWT'];
    router.push('/users/login');
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated, login, logout, loading,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Provides a `useAuth` hook that is accessible anywhere.
// Functions & variables included in `useAuth` include:
// function `login`, function `logout`, boolean `isAuthenticated`
export const useAuth = () => useContext(AuthContext);

export default AuthProvider;

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
