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
import ProtectRoute from '../../utils/ProtectRoute';

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
  const { outbound } = JSON.parse(event.data);
  const { inbound } = JSON.parse(event.data);
  const pastAttempts = outbound.length > 1;

  useEffect(() => {
    // TODO?
    document.body.style.overflowX = 'hidden';
  });

  return (
    <ProtectRoute>
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
          <EventStatus completed={event.completed} outbound={outbound} />
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
            <TimelineAccordion request={outbound.slice(-1).response} />
            {/* Outbounds */}
            <TimelineAccordion request={outbound.slice(-1).request} />
            {/* Failed attempts bar */}
            { pastAttempts && <FailedAttempts event={event} />}
            {/* Inbound */}
            <TimelineAccordion request={inbound} />
          </Timeline>
        </Grid>
      </Grid>
    </ProtectRoute>
  );
}

export async function getServerSideProps() {
  // TODO: Axios Request
  // const res = await fetchDataOrRedirect(context, '/bridges');
  // if (!res) return { props: {} }; // Redirecting to /users/login

  // return {
  //   props: {
  //     bridges: res.data.bridges,
  //   },
  // };

  return {
    props: SeedData,
  };
}

Requests.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  event: PropTypes.shape({
    id: PropTypes.number.isRequired,
    bridge_id: PropTypes.number.isRequired,
    completed: PropTypes.bool,
    completed_at: PropTypes.string,
    data: PropTypes.string,
    statusCode: PropTypes.number,
    test: PropTypes.bool,
  }).isRequired,
  sidebarEvents: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      bridge_id: PropTypes.number.isRequired,
      completed: PropTypes.bool,
      completed_at: PropTypes.string,
      data: PropTypes.string,
      statusCode: PropTypes.number,
      test: PropTypes.bool,
    }),
  ).isRequired,
};

export default Requests;
