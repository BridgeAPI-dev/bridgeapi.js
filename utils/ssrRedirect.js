import nookies from 'nookies';
import api from './api';

// Call this function during `getServerSideProps` to ensure
// a user is authenticated & retrieve the particular data a page needs
// if the user is not authenticated, they will be redirected
// to the login page. Returns `false` if redirect will be occuring.
//
// Usage:
//
// `if (!fetchDataOrRedirect(context)) { return { props: {} }}`
//
// *You can safely access the data retrieved from the api request*
const fetchData = async (context, endpoint) => {
  const { token } = nookies.get(context);
  const res = await api.get(endpoint, {
    headers: {
      'BRIDGE-JWT': token,
    },
  }).catch(() => false);

  return res;
};

export default fetchData;
