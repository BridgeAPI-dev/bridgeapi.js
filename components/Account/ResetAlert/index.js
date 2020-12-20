import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AlertDialog({ open, handleClose, resetForm }) {
  function handleReset() {
    resetForm();
    handleClose();
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-describedby="reset alert"
    >
      <DialogTitle id="reset-alert">Cancel changes</DialogTitle>
      <DialogContent>
        <DialogContentText id="reset-alert-text">
          Are you sure you wish to cancel changes?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Disagree
        </Button>
        <Button onClick={handleReset} color="primary" autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}

AlertDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
};
