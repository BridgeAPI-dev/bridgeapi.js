/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
import { makeStyles, Button, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import { Alert } from '@material-ui/lab';
import api from '../../utils/api';

const useStyles = makeStyles({
  mb: {
    marginBottom: '1em',
  },
  fullWidth: {
    width: '100%',
  },
  alignCenter: {
    alignSelf: 'center',
  },
});

function EventStatus({
  eventCompleted, aborted, outbound, eventId,
}) {
  const classes = useStyles();
  const [completed, setCompleted] = useState(eventCompleted);
  const [buttonDisable, setButtonDisable] = useState(false);

  const { statusCode, message } = (outbound.length >= 1 && outbound.slice(-1)[0].response);

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
        <Alert
          severity="info"
          classes={{
            message: classes.fullWidth,
            icon: classes.alignCenter,
          }}
        >
          <Grid container style={{ width: '100%' }}>
            <Grid item container justify="flex-start" xs={6} alignContent="center">
              Ongoing
            </Grid>
            <Grid item container justify="flex-end" xs={6}>
              <Button
                onClick={handleAbort}
                disable={buttonDisable}
                variant="contained"
                style={{ backgroundColor: '#f32013', color: 'white' }}
              >
                Abort event
              </Button>
            </Grid>
          </Grid>
        </Alert>
      </>
    );
  }

  if (aborted) {
    return (
      <>
        <Alert severity={severity} className={classes.mb}>
          Aborted
        </Alert>
      </>
    );
  }

  return (
    <Alert severity={severity} className={classes.mb} id="success-alert">
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
  aborted: PropTypes.bool.isRequired,
  eventCompleted: PropTypes.bool.isRequired,
  outbound: PropTypes.array.isRequired,
  eventId: PropTypes.number.isRequired,
};
