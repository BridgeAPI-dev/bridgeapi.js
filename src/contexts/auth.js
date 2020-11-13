import {
  createContext, useContext, useEffect,
} from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

import api from '../../utils/api';

const AuthContext = createContext({});

function AuthProvider({ children }) {
  const router = useRouter();

  // Sets the JWT in headers for future api requests on the current page.
  // Helper function that enables us to fire off requests without
  // having the set the header token each time.
  useEffect(() => {
    async function loadUserFromCookies() {
      const token = Cookies.get('token');
      if (token) {
        api.defaults.headers['BRIDGE-JWT'] = token;
      }
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
      // TODO: Currently, isAuthenticated is true by me manually settings a cookie named 'token'
      // Need to some how ensure it is a valid token and not a made up one
      isAuthenticated: /* !!user */!!Cookies.get('token'), login, logout,
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
