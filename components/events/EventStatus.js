/* eslint-disable react/forbid-prop-types */
import { makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles({
  mb: {
    marginBottom: '1em',
  },
});

function EventStatus({ completed, responses }) {
  const { statusCode, statusText } = responses.slice(-1)[0].headers;
  const classes = useStyles();

  if (!completed) {
    return (
      <Alert severity="info">
        Ongoing
      </Alert>
    );
  }

  const severity = statusCode <= 199 && 'info'
                 || statusCode <= 299 && 'success'
                 || statusCode <= 399 && 'warning'
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
  responses: PropTypes.object.isRequired,
};
