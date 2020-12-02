import React, { useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import CancelIcon from '@material-ui/icons/Cancel';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PauseIcon from '@material-ui/icons/Pause';
import { ListItemIcon, Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import api from '../../../utils/api';

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: 'inherit',
    color: theme.palette.primary.main,
  },
}));

function ActionsDialog({
  active, open, onClose, id,
}) {
  const [errorOpen, setErrorOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const classes = useStyles();
  const router = useRouter();

  const handleError = () => {
    setErrorOpen(true);
    setTimeout(() => {
      setErrorOpen(false);
    }, 2500);
  };

  const handleSuccess = () => {
    setTimeout(() => {
      setSuccessOpen(false);
    }, 2500);
  };

  const handleAbort = () => {
    api.patch('/events/abort', {
      bridge_id: id,
    })
      .then((res) => {
        if (res.status === 200) {
          setSuccessOpen(true);
        }
      })
      .catch(() => {
        handleError();
      });
  };

  const handleActivate = () => {
    api.patch(`/bridges/${id}/${active ? 'deactivate' : 'activate'}`).then(() => {
      router.push(`/bridge/${id}`);
      setSuccessOpen(true);
      handleSuccess();
    }).catch(() => handleError());
  };

  const handleDelete = () => {
    api.delete(`/bridges/${id}`).then(() => {
      router.push('/dashboard');
    }).catch(() => handleError());
  };

  return (
    <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={successOpen}
        autoHideDuration={3000}
      >
        <Alert severity="success">
          Success! Your bridge has been updated.
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={errorOpen}
        autoHideDuration={3000}
      >
        <Alert severity="error">
          Some error occurred. Please try again.
        </Alert>
      </Snackbar>
      <DialogTitle id="simple-dialog-title">Bridge Actions</DialogTitle>
      <List>
        <ListItem button onClick={handleAbort}>
          <ListItemIcon>
            <Avatar className={classes.avatar}>
              <CancelIcon fontSize="large" />
            </Avatar>
          </ListItemIcon>
          <ListItemText primary="Abort Ongoing Requests" />
        </ListItem>
        <ListItem button onClick={handleActivate}>
          <ListItemIcon>
            <Avatar className={classes.avatar}>
              <PauseIcon fontSize="large" />
            </Avatar>
          </ListItemIcon>
          <ListItemText primary={`${active ? 'Deactivate' : 'Activate'} Bridge`} />
        </ListItem>
        <ListItem button onClick={handleDelete}>
          <ListItemIcon>
            <Avatar className={classes.avatar}>
              <DeleteForeverIcon fontSize="large" />
            </Avatar>
          </ListItemIcon>
          <ListItemText primary="Delete Bridge" />
        </ListItem>
      </List>
    </Dialog>
  );
}

ActionsDialog.propTypes = {
  active: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
};

export default ActionsDialog;
