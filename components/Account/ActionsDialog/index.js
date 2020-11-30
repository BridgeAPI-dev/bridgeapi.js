import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  Button,
  DialogTitle,
  Dialog,
} from '@material-ui/core';

import api from '../../../utils/api';
import { useAuth } from '../../../src/contexts/auth';
import SnackAlert from '../../shared/SnackAlert';

const useStyles = makeStyles({
  titleRoot: {
    flex: '0 0 auto',
    margin: '0',
    padding: '16px 24px 0 24px',
    fontWeight: '700',
  },
});

function ActionsDialog({
  open, onClose, id,
}) {
  const [errorOpen, setErrorOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const classes = useStyles();
  const { logout } = useAuth();

  const handleDelete = () => {
    api.delete('/user')
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
    <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open} id={id}>
      <SnackAlert
        open={successOpen}
        onClose={handleSnackClose}
        severity="success"
        message="Account has been deleted. Redirecting..."
        id="modal-success-message"
      />
      <SnackAlert
        open={errorOpen}
        onClose={handleSnackClose}
        severity="error"
        message="Some error occurred. Please try again later."
        id="modal-error-message"
      />

      <DialogTitle classes={{
        root: classes.titleRoot,
      }}
      >
        Are you sure?
      </DialogTitle>

      <div
        style={{ padding: '0 24px 16px 24px' }}
        className={classes.paper}
      >
        <p id="simple-modal-description">
          This will permanently delete your account. All data will be lost forever.
        </p>
        <Button
          variant="contained"
          color="primary"
          style={{ marginRight: '10px' }}
          onClick={onClose}
          id="cancel-button"
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleDelete}
          style={{ backgroundColor: '#f32013', color: 'white' }}
          id="delete-account-button"
        >
          Delete Account
        </Button>

      </div>
    </Dialog>
  );
}

ActionsDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
};

export default ActionsDialog;
