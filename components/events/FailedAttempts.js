/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import { useState } from 'react';
import {
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import {
  TimelineConnector,
  TimelineContent,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from '@material-ui/lab';
import TimelineAccordion from './TimelineAccordion';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  hidden: {
    visibility: 'hidden',
  },
  oppositeContent: {
    flex: 0.02,
    marginLeft: '-0.65em',
  },
  accordion: {
    marginBottom: '2em',
    padding: '0.7em 0',
    width: '100%',
  },
  timelineContent: {
    marginTop: '-1.5em',
    marginBottom: '2em',
  },
});

const mapFailedAttempts = ({ outbounds, responses }) => {
  const orderedRequests = [];

  // Excluding the latest (successful) attempt
  responses.slice(0, -1).forEach((response, indx) => {
    orderedRequests.unshift(response, outbounds[indx]);
  });

  return orderedRequests.map((req) => <TimelineAccordion request={req} />);
};

function FailedAttempts({ event }) {
  const classes = useStyles();

  const [failedOpen, setFailedOpen] = useState(false);

  return (
    <>
      <TimelineItem>
        <TimelineOppositeContent className={classes.oppositeContent}>
          <Typography variant="body2" className={classes.hidden}>
            5:32PM
          </Typography>
        </TimelineOppositeContent>
        <TimelineSeparator style={{ marginRight: '0.35em', marginLeft: '.02em' }}>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent
          className={classes.timelineContent}
          onClick={() => setFailedOpen(!failedOpen)}
        >
          <Paper className={classes.accordion}>
            <Typography align="center" variant="h6" noWrap>
              {failedOpen ? 'Hide failed attempts' : 'Show failed attempts'}
            </Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
      {failedOpen && mapFailedAttempts(event)}
    </>
  );
}

export default FailedAttempts;

FailedAttempts.propTypes = {
  event: PropTypes.shape({
    completed: PropTypes.bool.isRequired,
    inbound: PropTypes.object.isRequired,
    outbounds: PropTypes.object.isRequired,
    responses: PropTypes.object.isRequired,
  }).isRequired,
};
