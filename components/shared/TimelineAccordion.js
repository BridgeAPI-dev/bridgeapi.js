import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
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

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  accordion: {
    marginBottom: '2em',
  },
  accordionDetails: {
    borderTop: '1px',
  },
  accordionSummary: {
    height: '4em',
  },
  cardTitle: {
    fontWeight: 900,
    fontSize: '1.3em',
  },
  oppositeContent: {
    flex: 0.02,
    marginLeft: '-1em',
  },
  timeline: {
    marginRight: '2em',
  },
  timelineContent: {
    marginTop: '-1.5em',
  },
});

export default function TimelineAccordion(props) {
  const classes = useStyles();
  const { title, subtitle } = props.request;
  const {
    contentType, date, length, time,
  } = props.request.headers;

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
              expandIcon={<ExpandMore />}
              aria-label="Expand"
              aria-controls="additional-actions1-content"
              id="additional-actions1-header"
              className={classes.accordionSummary}
            >
              <Grid container direction="column">
                <Typography variant="h6" style={{ fontWeight: 900 }}>
                  {title}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  {subtitle}
                </Typography>
              </Grid>
            </AccordionSummary>
            <AccordionDetails className={classes.accordionDetails}>
              <Grid container direction="column">
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
                <Typography style={{ marginTop: '1em', marginBottom: '1em' }}>
                  PAYLOAD:
                </Typography>
                <Box>(Code editor)</Box>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </TimelineContent>
      </TimelineItem>
    </>
  );
}
