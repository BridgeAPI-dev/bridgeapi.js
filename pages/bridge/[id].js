/*
  eslint no-param-reassign:
  ["error", { "props": true, "ignorePropertyModificationsFor": ["envVar"] }]
*/

import PropTypes from 'prop-types';
import Editor from '../../components/Editor';
import ProtectRoute from '../../utils/ProtectRoute';
import { fetchSSRData } from '../../utils/api';

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
  const res = await fetchSSRData(context, `/bridges/${context.query.id}`);
  if (!res) return { props: {} }; // Redirecting to /users/login

  const bridge = toCamel(res.data.bridge);
  bridge.environmentVariables.forEach((envVar) => {
    // If you change this 'XXXX-XXX-XXXX', make sure to update PayloadCard#generatePayload
    envVar.value = 'XXXX-XXX-XXXX';
  });

  return {
    props: {
      bridge,
    },
  };
}

Show.propTypes = {
  bridge: PropTypes.shape({
    active: PropTypes.bool.isRequired,
    slug: PropTypes.string.isRequired,
    outboundUrl: PropTypes.string.isRequired,
    httpMethod: PropTypes.string.isRequired,
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
