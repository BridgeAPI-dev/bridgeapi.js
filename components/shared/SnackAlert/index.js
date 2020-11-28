import PropTypes from 'prop-types';
import { Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

function SnackAlert({
  open, severity, message, onClose, id,
}) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={open}
      onClose={onClose}
      autoHideDuration={3000}
      id={id}
    >
      <Alert severity={severity}>
        { message }
      </Alert>
    </Snackbar>
  );
}

export default SnackAlert;

SnackAlert.propTypes = {
  id: PropTypes.bool.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  severity: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

SnackAlert.defaultProps = {
  onClose: () => {},
};
