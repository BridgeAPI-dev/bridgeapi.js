import React from 'react';
import PropTypes from 'prop-types';
import { Grid, makeStyles } from '@material-ui/core';
import { Timeline } from '@material-ui/lab';

import EventStatus from '../../components/Event/EventStatus';
import FailedAttempts from '../../components/Event/FailedAttempts';
import Navbar from '../../components/shared/dashboard/Navbar/index';
import Sidebar from '../../components/Sidebar';
import InboundAccordion from '../../components/Event/InboundAccordion';
import OutboundAccordion from '../../components/Event/OutboundAccordion';
import ResponseAccordion from '../../components/Event/ResponseAccordion';

import fetchDataOrRedirect from '../../utils/ssrRedirect';
import ProtectRoute from '../../utils/ProtectRoute';
import toCamel from '../../utils/toCamel';

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

function Events({ event }) {
  const classes = useStyles();

  const { inbound, outbound } = event.data;
  const requiredRetry = outbound.length > 1;

  return (
    <ProtectRoute>
      <Navbar />
      <Sidebar events={[]} title="TODO" />

      <Grid
        container
        spacing={5}
        className={classes.content}
        item
        sm={10}
      >

        <Grid item container direction="column" wrap="nowrap">
          <EventStatus
            eventCompleted={event.completed}
            aborted={event.aborted}
            outbound={outbound}
            id={event.id}
          />
          {/* <Typography align="center" variant="body2" className={classes.microCopy} noWrap>
            Send your events here:
          </Typography>
          <Typography
            align="center"
            variant="h6"
            noWrap
            className={classes.url}
          >
            {event.outbound_url}
          </Typography> */}
          <Timeline>
            <ResponseAccordion
              request={outbound[0].response}
            />

            <OutboundAccordion
              request={outbound[0].request}
            />

            { requiredRetry && <FailedAttempts requests={outbound.slice(1)} />}
            <InboundAccordion request={inbound} />
          </Timeline>
        </Grid>
      </Grid>
    </ProtectRoute>
  );
}

export async function getServerSideProps(context) {
  const res = await fetchDataOrRedirect(context, `/events/${context.query.slug}`);
  if (!res) return { props: {} }; // Redirecting to /users/login

  const { event } = res.data;
  event.data = JSON.parse(event.data);

  return {
    props: {
      event: toCamel(event),
    },
  };
}

Events.propTypes = {
  event: PropTypes.shape({
    completed: PropTypes.bool.isRequired,
    aborted: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    bridgeId: PropTypes.number.isRequired,
    completedAt: PropTypes.string.isRequired,
    data: PropTypes.shape({
      inbound: PropTypes.shape({
        dateTime: PropTypes.string.isRequired,
        contentLength: PropTypes.number.isRequired,
        payload: PropTypes.shape({}).isRequired,
      }).isRequired,

      outbound: PropTypes.arrayOf(
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
    }),
    statusCode: PropTypes.number,
    test: PropTypes.bool,
  }).isRequired,
};

export default Events;
