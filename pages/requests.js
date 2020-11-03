/* eslint-disable react/forbid-prop-types */
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import { Timeline } from '@material-ui/lab';

import EventStatus from '../components/requests/EventStatus';
import FailedAttempts from '../components/requests/FailedAttempts';
import Navbar from '../components/shared/dashboard/Navbar/index';
import { SeedData } from '../components/requests/SeedData';
import Sidebar from '../components/requests/Sidebar';
import TimelineAccordion from '../components/requests/TimelineAccordion';

const useStyles = makeStyles({
  microCopy: {
    paddingTop: '0.75em',
    paddingBottom: '1.5em',
  },
  url: {
    fontWeight: 'bold', paddingBottom: '3em',
  },
  eventTimeline: {
    maxHeight: 'calc(100vh - 50px)',
    overflow: 'scroll',
  },
});

function Requests({
  event, sidebarEvents, title, url,
}) {
  const classes = useStyles();
  const pastAttempts = event.responses.length > 1;

  useEffect(() => {
    document.body.style.overflowX = 'hidden';
  });

  return (
    <>
      <Navbar />

      {/* Whole page */}
      <Grid container spacing={5} direction="row" wrap="nowrap">

        {/* Sidebar */}
        <Sidebar events={sidebarEvents} title={title} />

        {/* Event timeline */}
        <Grid item container direction="column" xs={10} wrap="nowrap" className={classes.eventTimeline}>
          <EventStatus completed={event.completed} responses={event.responses} />
          <Typography align="center" variant="body2" className={classes.microCopy} noWrap>
            Send your events here:
          </Typography>
          <Typography
            align="center"
            variant="h6"
            noWrap
            className={classes.url}
          >
            {url}
          </Typography>
          <Timeline>
            {/* Responses */}
            <TimelineAccordion request={event.responses.slice(-1)[0]} />
            {/* Outbounds */}
            <TimelineAccordion request={event.outbounds.slice(-1)[0]} />
            {/* Failed attempts bar */}
            { pastAttempts && <FailedAttempts event={event} />}
            {/* Inbound */}
            <TimelineAccordion request={event.inbound} />
          </Timeline>
        </Grid>
      </Grid>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: SeedData,
  };
}

Requests.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  event: PropTypes.object.isRequired,
  sidebarEvents: PropTypes.array.isRequired,
};

export default Requests;
