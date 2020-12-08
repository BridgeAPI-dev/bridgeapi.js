/* eslint-disable react/forbid-prop-types */
import React, { useState, useEffect } from 'react';
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

function EventStatus({ eventData }) {
  const classes = useStyles();
  const [buttonDisable, setButtonDisable] = useState(false);
  const [data, setData] = useState({ ...eventData, severity: 'info', message: '' });

  const severity = (code) => {
    if (code <= 199) {
      return 'info';
    }

    if (code <= 299) {
      return 'success';
    }

    if (code <= 399) {
      return 'warning';
    }

    return 'error';
  };

  const handleAbort = async () => {
    setButtonDisable(true);
    await api.patch('/events/abort', {
      event_id: data.eventId,
    })
      .then((res) => {
        if (res.status === 200) {
          setData({
            ...data, aborted: true, completed: true, severity: 'error',
          });
        }
      });
    // TODO: Catch error
  };

  useEffect(() => {
    if (eventData.outbound.length >= 1 && eventData.outbound.slice(-1)[0].response) {
      const { statusCode, message } = (eventData.outbound.length >= 1
        && eventData.outbound.slice(-1)[0].response);

      setData({
        ...eventData, message, severity: severity(statusCode), statusCode,
      });
      return;
    }

    setData({
      ...eventData, message: 'Unprocessable', severity: 'error', statusCode: 'Error',
    });
  }, [eventData]);

  if (!data.completed) {
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

  if (data.aborted) {
    return (
      <>
        <Alert severity={data.severity} className={classes.mb}>
          Aborted
        </Alert>
      </>
    );
  }

  return (
    <Alert severity={data.severity} className={classes.mb} id="success-alert">
      {data.statusCode}
      {' '}
      -
      {' '}
      {data.message}
    </Alert>
  );
}

export default EventStatus;

EventStatus.propTypes = {
  eventData: PropTypes.shape({
    aborted: PropTypes.bool.isRequired,
    completed: PropTypes.bool.isRequired,
    outbound: PropTypes.array.isRequired,
    eventId: PropTypes.number.isRequired,
  }).isRequired,
};
