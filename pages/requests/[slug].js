/* eslint-disable react/forbid-prop-types */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import { Timeline } from '@material-ui/lab';

import EventStatus from '../../components/requests/EventStatus';
import FailedAttempts from '../../components/requests/FailedAttempts';
import Navbar from '../../components/shared/dashboard/Navbar/index';
import { SeedData } from '../../components/requests/SeedData';
import Sidebar from '../../components/Sidebar';
import TimelineAccordion from '../../components/requests/TimelineAccordion';

const useStyles = makeStyles(() => ({
  microCopy: {
    paddingTop: '0.5em',
  },
  url: {
    fontWeight: 'bold',
    paddingBottom: '1em',
  },
  content: {
    marginLeft: 180,
  },
}));

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
      <Sidebar events={sidebarEvents} title={title} />

      <Grid
        container
        spacing={5}
        className={classes.content}
        sm={10}
      >

        {/* Event timeline */}
        <Grid item container direction="column" wrap="nowrap">
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

export async function getServerSideProps() {
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
