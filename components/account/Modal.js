import { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, makeStyles } from '@material-ui/core';

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

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    console.log('Deleting accounting');
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
        >
          Delete Account
        </Button>
      </div>

    </Modal>
  );
}

export default DeleteAccountModal;

DeleteAccountModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};
