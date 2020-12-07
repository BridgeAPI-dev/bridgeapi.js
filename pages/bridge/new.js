import Editor from '../../components/Editor';
import ProtectRoute from '../../utils/ProtectRoute';

function New() {
  return (
    <ProtectRoute>
      <Editor />
    </ProtectRoute>
  );
}

export default New;
