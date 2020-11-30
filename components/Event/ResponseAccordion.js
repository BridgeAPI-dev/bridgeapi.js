import PropTypes from 'prop-types';
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
    flex: 0,
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
});

function ResponseAccordion({ request }) {
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
              title="Response"
              subtitle="Response from the outbound service"
            />

            <AccordionDetails className={classes.accordionDetails}>
              <Grid container direction="column">
                <Typography>
                  Timestamp:
                  {' '}
                  {request.dateTime}
                </Typography>

                <Typography>
                  Content-Type:
                  {' '}
                  application/json
                </Typography>

                <Typography>
                  Content-Length:
                  {' '}
                  {request.size}
                </Typography>

                <Typography>
                  Code:
                  {' '}
                  {request.statusCode}
                  {' '}
                  {request.message}
                </Typography>

                <Typography variant="subtitle1" className={classes.payloadHeader}>
                  Payload:
                </Typography>

                <CodeMirror readOnly isEditView data={request.payload} />
              </Grid>
            </AccordionDetails>
          </Accordion>
        </TimelineContent>
      </TimelineItem>
    </>
  );
}

ResponseAccordion.propTypes = {
  request: PropTypes.shape({
    dateTime: PropTypes.string.isRequired,
    statusCode: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    payload: PropTypes.shape({}).isRequired,
  }).isRequired,
};

export default ResponseAccordion;
