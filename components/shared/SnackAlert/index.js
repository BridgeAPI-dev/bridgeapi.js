import PropTypes from 'prop-types';
import { Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

function SnackAlert({
  open, severity, message, onClose,
}) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={open}
      onClose={onClose}
      autoHideDuration={3000}
    >
      <Alert severity={severity}>
        { message }
      </Alert>
    </Snackbar>
  );
}

export default SnackAlert;

SnackAlert.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  severity: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

SnackAlert.defaultProps = {
  onClose: () => {},
};
