/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import { Alert, Button } from '@material-ui/lab';
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

  useEffect(() => {
    const handleAbort = async () => { await api.patch('/events/abort', { id: eventId }); };
    let cancelled = false;
    setAborting(true);
    handleAbort()
      .then(() => {
        if (!cancelled) {
          setAborted(true);
          cancelled = true;
        }
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [aborted]);

  if (!completed) {
    return (
      <>
        <Alert severity="info">
          { aborted ? 'Aborted' : 'Ongoing' }
        </Alert>
        { !aborted
        && (
        <Button onClick={setAborted(true)}>
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
