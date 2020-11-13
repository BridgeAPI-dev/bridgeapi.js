import PropTypes from 'prop-types';
import Editor from '../../components/Editor';
import ProtectRoute from '../../utils/ProtectRoute';
import fetchDataOrRedirect from '../../utils/ssrRedirect';

import toCamel from '../../utils/toCamel';

function Show({ bridge }) {
  return (
    <ProtectRoute>
      <Editor
        bridge={bridge}
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
      bridge: toCamel(res.data.bridge),
    },
  };
}

Show.propTypes = {
  bridge: PropTypes.shape({
    id: PropTypes.number.isRequired,
    outboundUrl: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    retries: PropTypes.number.isRequired,
    delay: PropTypes.number.isRequired,
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
    data: PropTypes.shape({
      payload: PropTypes.string.isRequired,
      testPayload: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
