import PropTypes from 'prop-types';

import Editor from '../../components/Editor';
import ProtectRoute from '../../utils/ProtectRoute';

function Show({
  outboundURL, method, retries, delay, headers, envVars,
}) {
  return (
    <ProtectRoute>
      <Editor
        outboundURL={outboundURL}
        method={method}
        retries={retries}
        delay={delay}
        headers={headers}
        envVars={envVars}
        isEditView
      />
    </ProtectRoute>
  );
}

export default Show;

export async function getServerSideProps() {
  // TODO: Axios Request
  // const res = await fetchDataOrRedirect(context, '/bridges');
  // if (!res) return { props: {} }; // Redirecting to /users/login

  // return {
  //   props: {
  //     bridges: res.data.bridges,
  //   },
  // };

  return {
    props: {
      outboundURL: 'https://slack.com/new_message/934782',
      method: 'POST',
      retries: '3',
      delay: '0',
      headers: [
        { key: 'X-API-KEY', value: '$env.API_KEY' },
      ],
      envVars: [
        { key: 'API_KEY', value: 'XXXXXXXXXXXXXXX' },
      ],
    },
  };
}

Show.propTypes = {
  outboundURL: PropTypes.string.isRequired,
  method: PropTypes.string.isRequired,
  retries: PropTypes.string.isRequired,
  delay: PropTypes.string.isRequired,
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
  envVars: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
