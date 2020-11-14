import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Modal, makeStyles, Snackbar,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import api from '../../utils/api';
import { useAuth } from '../../src/contexts/auth';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: null,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: '8px',
  },
}));

function DeleteAccountModal({ open, setOpen }) {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const { logout } = useAuth();
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    api.delete('/users')
      .then(() => {
        setSuccessOpen(true);
        setTimeout(() => { logout(); }, 1000);
      })
      .catch(() => {
        setErrorOpen(true);
      });
  };

  const handleSnackClose = (_, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSuccessOpen(false);
    setErrorOpen(false);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div style={modalStyle} className={classes.paper}>
        <h2 id="simple-modal-title">Are you sure?</h2>
        <p id="simple-modal-description">
          This will permanently delete your account. All data will be lost forever.
        </p>
        <Button
          variant="contained"
          color="primary"
          style={{ marginRight: '10px' }}
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleDelete}
          style={{ backgroundColor: '#f32013', color: 'white' }}
        >
          Delete Account
        </Button>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={successOpen}
          autoHideDuration={3000}
          onClose={handleSnackClose}
        >
          <Alert onClose={handleSnackClose} severity="success">
            Account has been deleted. Redirecting...
          </Alert>
        </Snackbar>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={errorOpen}
          autoHideDuration={3000}
          onClose={handleSnackClose}
        >
          <Alert onClose={handleSnackClose} severity="error">
            Some error occurred. Please try again later.
          </Alert>
        </Snackbar>
      </div>
    </Modal>
  );
}

export default DeleteAccountModal;

DeleteAccountModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};
