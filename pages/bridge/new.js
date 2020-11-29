import Editor from '../../components/Editor';
import ProtectRoute from '../../utils/ProtectRoute';
import { ssrRedirectUnlessToken } from '../../utils/ssrRedirect';

function New() {
  return (
    <ProtectRoute>
      <Editor />
    </ProtectRoute>
  );
}

export default New;

export async function getServerSideProps(context) {
  ssrRedirectUnlessToken(context);
  return { props: {} };
}
