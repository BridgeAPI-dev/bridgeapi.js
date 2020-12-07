import PropTypes from 'prop-types';
import React from 'react';
import {
  Accordion,
  AccordionDetails,
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

import { hourMinutes } from '../../utils/formatDate';

const useStyles = makeStyles((theme) => ({
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
  uri: {
    fontWeight: '700',
    align: 'center',
    marginBottom: '0.5em',
  },
  oppositeContent: {
    flex: 0.02,
  },
  payloadHeader: {
    margin: '0.5em 0 0 0',
  },
  timeline: {
    marginRight: '2em',
  },
  timelineContent: {
    marginTop: '-1.5em',
    marginBottom: '4em',
  },
  bold: {
    fontWeight: '700',
    margin: theme.spacing(0, 1, 0, 2),
  },
}));

function OutboundAccordion({ request }) {
  const classes = useStyles();
  const time = hourMinutes(request.dateTime);

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
          <TimelineConnector />
        </TimelineSeparator>

        <TimelineContent className={classes.timelineContent}>
          <Accordion className={classes.accordion}>
            <AccordionSummary
              icon={<ExpandMore />}
              title="Outbound"
              subtitle="Sent to the outbound service"
            />

            <AccordionDetails className={classes.accordionDetails}>
              <Grid container direction="column">
                <Typography align="center" className={classes.uri}>
                  URI:
                  {' '}
                  {request.uri}
                </Typography>

                <Typography>
                  Timestamp:
                  {' '}
                  {request.dateTime}
                </Typography>

                <Typography>
                  Headers:
                </Typography>

                {request.headers.map((header) => (
                  <div style={{ display: 'flex' }} key={`${header.key}`}>
                    <Typography variant="body1" className={classes.bold}>
                      {header.key}
                      :
                    </Typography>
                    <Typography variant="body1">
                      {header.value}
                    </Typography>
                  </div>
                ))}

                <Typography
                  variant="subtitle1"
                  className={classes.payloadHeader}
                >
                  Payload:
                </Typography>

                <CodeMirror readOnly id="codemirror-outbound" isEditView data={request.payload} />
              </Grid>
            </AccordionDetails>
          </Accordion>
        </TimelineContent>
      </TimelineItem>
    </>
  );
}

OutboundAccordion.propTypes = {
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
};

export default OutboundAccordion;
