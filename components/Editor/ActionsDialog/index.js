import React, { useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import CancelIcon from '@material-ui/icons/Cancel';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PauseIcon from '@material-ui/icons/Pause';
import { ListItemIcon } from '@material-ui/core';

import api from '../../../utils/api';
import SnackAlert from '../../shared/SnackAlert';

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: 'inherit',
    color: theme.palette.primary.main,
  },
}));

function ActionsDialog({
  active, open, onClose, bridgeSlug,
}) {
  const [errorOpen, setErrorOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [warningOpen, setWarningOpen] = useState(false);
  const classes = useStyles();
  const router = useRouter();

  const closeAlerts = () => {
    setSuccessOpen(false);
    setWarningOpen(false);
    setErrorOpen(false);
  };

  const handleError = () => {
    setErrorOpen(true);
    setTimeout(() => {
      setErrorOpen(false);
    }, 2500);
  };

  const handleSuccess = () => {
    setTimeout(() => {
      closeAlerts();
    }, 2500);
  };

  const handleAbort = () => {
    closeAlerts();
    api.patch('/events/abort', {
      bridge_slug: bridgeSlug,
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
    closeAlerts();
    api.patch(`/bridges/${bridgeSlug}/${active ? 'deactivate' : 'activate'}`).then(() => {
      router.push(`/bridge/${bridgeSlug}`);
      if (active) {
        setWarningOpen(true);
      } else {
        setSuccessOpen(true);
      }
      handleSuccess();
    }).catch(() => handleError());
  };

  const handleDelete = () => {
    closeAlerts();
    api.delete(`/bridges/${bridgeSlug}`).then(() => {
      router.push('/dashboard');
    }).catch(() => handleError());
  };

  return (
    <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
      <SnackAlert open={successOpen} severity="success" message="Success! Your bridge has been updated." id="actions-success-message" />
      <SnackAlert open={warningOpen} severity="warning" message="The bridge has been deactivated" id="actions-warning-message" />
      <SnackAlert open={errorOpen} severity="error" message="Some error occurred. Please try again." id="actions-error-message" />
      <DialogTitle id="simple-dialog-title">Bridge Actions</DialogTitle>
      <List>
        <ListItem button onClick={handleAbort} id="action-abort">
          <ListItemIcon>
            <CancelIcon fontSize="large" className={classes.avatar} />
          </ListItemIcon>
          <ListItemText primary="Abort Ongoing Requests" />
        </ListItem>
        <ListItem button onClick={handleActivate} id="action-deactive">
          <ListItemIcon>
            <PauseIcon fontSize="large" className={classes.avatar} />
          </ListItemIcon>
          <ListItemText primary={`${active ? 'Deactivate' : 'Activate'} Bridge`} />
        </ListItem>
        <ListItem button onClick={handleDelete} id="action-delete">
          <ListItemIcon>
            <DeleteForeverIcon fontSize="large" className={classes.avatar} />
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
  bridgeSlug: PropTypes.string.isRequired,
};

export default ActionsDialog;
