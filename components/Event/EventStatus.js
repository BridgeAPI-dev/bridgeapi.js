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

function EventStatus({
  eventCompleted, eventAborted, outbound, eventId,
}) {
  const classes = useStyles();
  const [completed, setCompleted] = useState(eventCompleted);
  const [buttonDisable, setButtonDisable] = useState(false);

  const { statusCode, message } = outbound.slice(-1)[0].response;

  const severity = (statusCode <= 199 && 'info')
  || (statusCode <= 299 && 'success')
  || (statusCode <= 399 && 'warning')
  || 'error';

  const handleAbort = async () => {
    setButtonDisable(true);
    await api.patch(`/events/${eventId}/abort`);
    setCompleted(true);
  };

  if (!completed) {
    return (
      <>
        <Alert severity="info">
          Ongoing
        </Alert>
        <Button onClick={handleAbort} disable={buttonDisable}>
          Abort event
        </Button>
      </>
    );
  }

  if (eventAborted) {
    return (
      <>
        <Alert severity={severity} className={classes.mb}>
          Aborted
        </Alert>
      </>
    );
  }

  return (
    <Alert severity={severity} className={classes.mb}>
      {statusCode}
      {' '}
      -
      {' '}
      {message}
    </Alert>
  );
}

export default EventStatus;

EventStatus.propTypes = {
  eventAborted: PropTypes.bool.isRequired,
  eventCompleted: PropTypes.bool.isRequired,
  outbound: PropTypes.array.isRequired,
  eventId: PropTypes.number.isRequired,
};
