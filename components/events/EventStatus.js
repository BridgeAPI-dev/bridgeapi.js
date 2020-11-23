/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
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

  if (!completed) {
    return (
      <>
        <Alert severity="info">
          { aborted ? 'Aborted' : 'Ongoing' }
        </Alert>
        { !aborted
        && (
        <Button onClick={
          async () => api.get('/events/abort', { id: eventId })
            .then(setAborted(true))
            .catch(() => {})
}
        >
          Abort events
        </Button>
        )}
      </>
    );
  }

  const severity = (statusCode <= 199 && 'info')
                 || (statusCode <= 299 && 'success')
                 || (statusCode <= 399 && 'warning')
                 || 'error';

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
