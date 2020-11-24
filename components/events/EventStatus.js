/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
import { makeStyles, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import { Alert } from '@material-ui/lab';
import api from '../../utils/api';

const useStyles = makeStyles({
  mb: {
    marginBottom: '1em',
  },
});

function EventStatus({ completed, outbound, eventId }) {
  const { statusCode, statusText } = outbound.slice(-1).response;
  const classes = useStyles();
  const [aborted, setAborted] = useState(false);
  const [aborting, setAborting] = useState(false);
  const severity = (statusCode <= 199 && 'info')
  || (statusCode <= 299 && 'success')
  || (statusCode <= 399 && 'warning')
  || 'error';

  const handleAbort = async () => {
    setAborting(true);
    await api.patch('/events/abort', { id: eventId });
    setAborting(false);
    setAborted(true);
  };

  if (!completed) {
    return (
      <>
        <Alert severity="info">
          { aborted ? 'Aborted' : 'Ongoing' }
        </Alert>
        { !aborted
        && (
        <Button onClick={handleAbort}>
          {aborting ? 'aborting...' : 'Abort events'}
        </Button>
        )}
      </>
    );
  }

  return (
    <Alert severity={severity} className={classes.mb}>
      {statusCode}
      {' '}
      -
      {' '}
      {statusText}
    </Alert>
  );
}

export default EventStatus;

EventStatus.propTypes = {
  completed: PropTypes.bool.isRequired,
  outbound: PropTypes.array.isRequired,
  eventId: PropTypes.number.isRequired,
};
