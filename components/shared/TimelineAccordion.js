import {
  Accordion,
  AccordionSummary,
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

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  accordion: {
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
  centeredBold: {
    fontWeight: '700',
    align: 'center',
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
    marginBottom: '4em',
  },
});

export default function TimelineAccordion(props) {
  const classes = useStyles();
  const { title, subtitle } = props.request;
  const {
    contentType, date, host, latency, length, size, statusCode, statusText, time, url,
  } = props.request.headers;

  return (
    <>
      <TimelineItem className={classes.timelineItem}>
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
                <Typography variant="subtitle2" color="textSecondary" noWrap>
                  {subtitle}
                </Typography>
              </Grid>
            </AccordionSummary>
            <AccordionDetails className={classes.accordionDetails}>
              <Grid container direction="column">
                <Divider style={{ marginBottom: '1em' }} />
                <Typography align="center" className={classes.centeredBold}>
                  {/* If it's an Inbound or Outbound request */}
                  {['Inbound', 'Outbound'].includes(title) && `${time} on ${date}`}
                  {/* If it's a response */}
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
                <Typography style={{ marginTop: '1em', marginBottom: '1em' }}>
                  PAYLOAD:
                  {/* Editor */}
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
