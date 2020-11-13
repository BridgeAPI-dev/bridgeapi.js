import PropTypes from 'prop-types';
import Editor from '../../components/Editor';
import ProtectRoute from '../../utils/ProtectRoute';
import fetchDataOrRedirect from '../../utils/ssrRedirect';

const camelcaseKeys = require('camelcase-keys');

function Show({ bridge }) {
  const {
    outboundUrl, method, retries, delay, headers, environmentVariables,
  } = bridge;

  return (
    <ProtectRoute>
      <Editor
        outboundURL={outboundUrl}
        method={method}
        retries={retries}
        delay={delay}
        headers={headers}
        envVars={environmentVariables}
        isEditView
      />
    </ProtectRoute>
  );
}

export default Show;

export async function getServerSideProps(context) {
  const res = await fetchDataOrRedirect(context, `/bridges/${context.query.id}`);
  if (!res) return { props: {} }; // Redirecting to /users/login

  return {
    props: {
      bridge: camelcaseKeys(res.data.bridge, { deep: true }),
    },
  };
}

Show.propTypes = {
  bridge: PropTypes.shape({
    outboundUrl: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    retries: PropTypes.string.isRequired,
    delay: PropTypes.string.isRequired,
    headers: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
      }),
    ).isRequired,
    environmentVariables: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }).isRequired,
};
