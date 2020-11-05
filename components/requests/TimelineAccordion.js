/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import {
  Accordion,
  AccordionDetails,
  Box,
  Divider,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import {
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from '@material-ui/lab';
import { ExpandMore } from '@material-ui/icons';

import AccordionSummary from '../AccordionSummary';
import CodeMirror from '../Codemirror';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  accordionDetails: {
    borderTop: '1px',
  },
  cardTitle: {
    fontWeight: 900,
    fontSize: '1.3em',
  },
  centeredBold: {
    fontWeight: '700',
    align: 'center',
  },
  oppositeContent: {
    flex: 0.02,
    marginLeft: '-1em',
  },
  payloadHeader: {
    margin: '1em 0',
  },
  timeline: {
    marginRight: '2em',
  },
  timelineContent: {
    marginTop: '-1.5em',
    marginBottom: '4em',
  },
});

function TimelineAccordion({ request }) {
  const classes = useStyles();
  const { title, subtitle } = request;
  const {
    contentType, date, host, latency, length, size, statusCode, statusText, time, url,
  } = request.headers;

  return (
    <>
      <TimelineItem>
        <TimelineOppositeContent className={classes.oppositeContent}>
          <Typography variant="body2">
            {time}
          </Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot color="primary" />
          {title !== 'Inbound' && <TimelineConnector />}
        </TimelineSeparator>
        <TimelineContent className={classes.timelineContent}>
          <Accordion className={classes.accordion}>

            <AccordionSummary
              icon={<ExpandMore />}
              title={title}
              subtitle={subtitle}
            />

            <AccordionDetails className={classes.accordionDetails}>
              <Grid container direction="column">

                <Typography align="center" className={classes.centeredBold}>
                  {/* If it's an Inbound or Outbound request */}
                  {['Inbound', 'Outbound'].includes(title) && `${time} on ${date}`}

                  {/* Or if it's a response */}
                  {title === 'Response' && `Status: ${statusCode} ${statusText} Time: ${latency} ms Size: ${size} KB`}
                </Typography>
                <Typography align="center" className={classes.centeredBold}>
                  {title === 'Inbound' && `Event received from ${host}`}
                  {title === 'Outbound' && `Sent to ${url}`}
                </Typography>
                <Typography>HEADERS:</Typography>
                <Typography>
                  Date:
                  {' '}
                  {date}
                </Typography>
                <Typography>
                  Content-Type:
                  {' '}
                  {contentType}
                </Typography>
                <Typography>
                  Content-Length:
                  {' '}
                  {length}
                </Typography>
                <Typography className={classes.payloadHeader}>
                  PAYLOAD:
                </Typography>

                <CodeMirror readonly isEditView />
              </Grid>
            </AccordionDetails>
          </Accordion>
        </TimelineContent>
      </TimelineItem>
    </>
  );
}

TimelineAccordion.propTypes = {
  request: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    headers: PropTypes.object.isRequired,
    payload: PropTypes.object.isRequired,
  }).isRequired,
};

export default TimelineAccordion;
