import {
  createContext, useContext, useEffect,
} from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

import api from '../../utils/api';

const AuthContext = createContext({});

function AuthProvider({ children }) {
  // TODO
  // const [user, setUser] = useState(null)
  const router = useRouter();

  // Sets the bearer token for future api requests on this page.
  // Helper function that enables us to fire off requests without
  // having the set the bearer token each time.
  useEffect(() => {
    async function loadUserFromCookies() {
      const token = Cookies.get('token');
      if (token) {
        api.defaults.headers.Authorization = `Bearer ${token}`;
        // TODO
        // const { data: user } = await api.get('users/me');
        // if (user) setUser(user);
      }
    }

    loadUserFromCookies();
  }, []);

  // Fires off an api request to fetch the JWT.
  // If it succeeds, token will be set in cookies & returns true,
  // otherwise returns false.
  // Accessible through the `useAuth` hook.
  const login = async (email, password) => {
    const { data: token } = await api.post('/users/login', { user: { email, password } });

    if (token.token) {
      Cookies.set('token', token.token, { expires: 60 });
      api.defaults.headers['BRIDGE-JWT'] = token.token;

      return true;
    }

    return false;
  };

  // Deletes cookie token & then redirects to login page.
  // Accessible through the `useAuth` hook.
  const logout = () => {
    Cookies.remove('token');
    delete api.defaults.headers.Authorization;
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
