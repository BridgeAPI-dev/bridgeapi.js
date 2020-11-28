import PropTypes from 'prop-types';
import { useState } from 'react';
import {
  AccordionSummary as MUIAccordionSummary,
  Grid,
  makeStyles,
  Accordion,
  Typography,
} from '@material-ui/core';
import {
  TimelineConnector,
  TimelineContent,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from '@material-ui/lab';

import OutboundAccordion from './OutboundAccordion';
import ResponseAccordion from './ResponseAccordion';

const useStyles = makeStyles({
  root: {
    width: '100%',
    alignItems: 'center',
    minHeight: '64px',
  },
  hidden: {
    visibility: 'hidden',
  },
  oppositeContent: {
    flex: 0,
    // marginLeft: '-0.65em',
  },
  accordion: {
    marginBottom: '2em !important',
    // padding: '0.7em 0',
    width: '100%',
    minHeight: '64px',
  },
  timelineContent: {
    marginTop: '-1.5em',
    marginBottom: '2em',
  },
  expanded: {
    margin: '0 !important',
  },
  heading: {
    fontWeight: 'bold',
  },
});

function FailedAttempts({ requests }) {
  const classes = useStyles();

  const [failedOpen, setFailedOpen] = useState(false);

  return (
    <>
      <TimelineItem>
        <TimelineOppositeContent className={classes.oppositeContent}>
          <Typography variant="body2" className={classes.hidden}>
            10:32:33 PM
          </Typography>
        </TimelineOppositeContent>

        <TimelineSeparator>
          <span
            className="MuiTimelineDot-root MuiTimelineDot-defaultPrimary"
            // TODO: Uncomment this to make dot disappear
            // style={{
            //   visibility: 'hidden',
            //   margin: '0',
            //   borderWidth: '0 2px',
            //   padding: '0 4px',
            // }}
          />
          <TimelineConnector />
        </TimelineSeparator>

        <TimelineContent
          className={classes.timelineContent}
          onClick={() => setFailedOpen(!failedOpen)}
        >
          <Accordion className={classes.accordion}>
            <MUIAccordionSummary
              className={classes.root}
              classes={{
                expanded: classes.expanded,
              }}
            >
              <Grid container>
                <Grid item>
                  <Typography className={classes.heading} align="center">
                    {failedOpen ? 'Hide failed attempts' : 'Show failed attempts'}
                  </Typography>
                </Grid>
              </Grid>
            </MUIAccordionSummary>
          </Accordion>
        </TimelineContent>
      </TimelineItem>

      {failedOpen && requests.map((req) => (
        <>
          <ResponseAccordion request={req.response} />
          <OutboundAccordion request={req.request} />
        </>
      ))}
    </>
  );
}

export default FailedAttempts;

FailedAttempts.propTypes = {
  requests: PropTypes.arrayOf(
    PropTypes.shape({
      request: PropTypes.shape({
        dateTime: PropTypes.string.isRequired,
        contentLength: PropTypes.string.isRequired,
        uri: PropTypes.string.isRequired,
        payload: PropTypes.shape({}).isRequired,
        headers: PropTypes.arrayOf(
          PropTypes.shape({
            key: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
          }),
        ),
      }).isRequired,

      response: PropTypes.shape({
        dateTime: PropTypes.string.isRequired,
        statusCode: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
        size: PropTypes.number.isRequired,
        payload: PropTypes.shape({}).isRequired,
      }).isRequired,
    }).isRequired,
  ).isRequired,
};
