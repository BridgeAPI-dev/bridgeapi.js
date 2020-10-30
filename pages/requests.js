import { useState, useEffect } from 'react';
import {
  Card,
  Grid,
  makeStyles,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@material-ui/core';
import {
  Alert,
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from '@material-ui/lab';
import Navbar from '../components/shared/dashboard/Navbar/index';
import TimelineAccordion from '../components/shared/TimelineAccordion';

const getAlert = (props) => {
  const { statusCode, statusText } = props.events[0].responses.slice(-1)[0].headers;
  const { completed } = props.events[0];
  if (!completed) {
    return (
      <Alert severity="info">
        Ongoing
      </Alert>
    );
  }

  switch (true) {
    case statusCode <= 199:
      return (
        <Alert severity="info">
          {statusCode}
          {' '}
          -
          {' '}
          {statusText}
        </Alert>
      );
    case statusCode <= 299:
      return (
        <Alert severity="success">
          {statusCode}
          {' '}
          -
          {' '}
          {statusText}
        </Alert>
      );
    case statusCode <= 399:
      return (
        <Alert severity="warning">
          {statusCode}
          {' '}
          -
          {' '}
          {statusText}
        </Alert>
      );
    default:
      return (
        <Alert severity="error">
          {statusCode}
          {' '}
          -
          {' '}
          {statusText}
        </Alert>
      );
  }
};

const populateSidebar = (events) => events.reverse().slice().map((ev) => {
  const { date, statusCode, time } = ev.responses.slice(-1)[0].headers;
  return (
    <ListItem divider>
      <ListItemText>
        <Typography
          variant="body2"
          align={ev.completed ? 'center' : 'right'}
        >
          {ev.completed ? `${time} - ${date} ${statusCode}` : 'Ongoing' }
        </Typography>
      </ListItemText>
    </ListItem>
  );
});

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  oppositeContent: {
    flex: 0.02,
    marginLeft: '-1em',
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
  timeline: {
    marginRight: '2em',
  },
  cardTitle: {
    fontWeight: 900,
    fontSize: '1.3em',
  },
  timelineContent: {
    marginTop: '-1.5em',
  },
});

function Requests(props) {
  const classes = useStyles();
  const {
    events, eventsForSidebar, text, url,
  } = props;

  const [failedAttempts, setFailedAttempts] = useState(true);
  const [failedOpen, setFailedOpen] = useState(false);

  const FailedAttemptsBar = () => (
    <TimelineItem className={classes.failedAttemptsBar}>
      <Grid container item direction="row">
        <TimelineOppositeContent className={classes.oppositeContent} />
        <TimelineSeparator style={{ marginLeft: '-.45em', marginRight: '.45em' }}>
          <TimelineConnector className={classes.secondaryTail} />
        </TimelineSeparator>
        <TimelineContent
          className={classes.timelineContent}
          onClick={() => setFailedOpen(!failedOpen)}
        >
          <Card>
            <Typography align="center" variant="h6">
              {failedOpen ? 'Hide failed attempts' : 'Show failed attempts'}
            </Typography>
          </Card>
        </TimelineContent>
      </Grid>
    </TimelineItem>
  );

  const mapFailedAttempts = (event) => {
    const { outbounds, responses } = event;
    const orderedRequests = [];

    // Excluding the latest (successfull) attempt
    responses.slice(0, -1).forEach((response, indx) => {
      orderedRequests.unshift(response, outbounds[indx]);
    });

    return orderedRequests.map((req) => <TimelineAccordion request={req} />);
  };

  // To fill up sidebar
  let i = 20;
  while (i > 0) {
    props.eventsForSidebar.unshift(randomItem);
    i -= 1;
  }

  return (
    <>
      <Navbar />

      {/* Sidebar */}
      <Grid container spacing={5} direction="row" wrap="nowrap">
        <Grid
          item
          direction="column"
          xs={1.5}
          style={{ 'overflow-y': 'scroll' }}
        />
        <List>
          {populateSidebar(eventsForSidebar)}
        </List>

        <Grid item xs={10}>
          {getAlert(props)}
          <Typography align="center" variant="body2" style={{ marginTop: '1em' }}>
            Send your events here:
          </Typography>
          <Typography
            align="center"
            variant="h6"
            style={{ fontWeight: 'bold', marginBottom: '1em' }}
          >
            {url}
          </Typography>

          <Timeline>
            <TimelineAccordion
              request={events[0].responses.slice(-1)[0]}
            />
            <TimelineAccordion
              request={events[0].outbounds.slice(-1)[0]}
            />

            {/* Failed attempts bar */}
            { failedAttempts && !failedOpen && <FailedAttemptsBar text="Show failed attempts" />}
            { failedAttempts && failedOpen && <FailedAttemptsBar text="Hide failed attempts" />}
            {failedOpen && mapFailedAttempts(events[0])}

            <TimelineAccordion
              request={events[0].inbound}
            />

          </Timeline>
        </Grid>
      </Grid>
    </>
  );
}

// TO BECOME A GetStaticProps later
Requests.defaultProps = {
  title: 'Bridge1',
  url: 'https://bridgeapi.dev/event/8726933',
  events: [
    {
      completed: true,
      inbound: {
        title: 'Inbound',
        subtitle: 'Received from the inbound service',
        headers: {
          method: 'Post',
          host: '192.125.2.2',
          contentType: 'application/json',
          contentLength: 6615,
          time: '5:28PM',
          date: '10-2-2012',
        },
        payload: { data: 'some data' },
      },
      outbounds: [{
        title: 'Outbound',
        subtitle: 'Sent to the outbound service',
        headers: {
          method: 'Post',
          contentType: 'application/json',
          contentLength: 6615,
          time: '5:29PM',
          date: '10-2-2012',
        },
        payload: {
          data: 'some data',
        },
      }, {
        title: 'Outbound',
        subtitle: 'Sent to the outbound service',
        headers: {
          method: 'Post',
          contentType: 'application/json',
          contentLength: 6615,
          time: '5:31PM',
          date: '10-2-2012',
        },
        payload: {
          data: 'some data',
        },
      },
      ],
      responses: [{
        title: 'Response',
        subtitle: 'Response from the outbound service',
        headers: {
          statusCode: 403,
          statusText: 'Forbidden',
          contentType: 'application/json',
          length: 6615,
          date: '17-10-2013',
          time: '5:30PM',
          latency: 796,
          size: 1.17,
        },
        payload: { data: 'some data' },
      }, {
        title: 'Response',
        subtitle: 'Response from the outbound service',
        headers: {
          statusCode: 200,
          statusText: 'OK',
          contentType: 'application/json',
          length: 6615,
          date: '17-10-2013',
          time: '5:32PM',
          latency: 796,
          size: 1.17,
        },
        payload: { data: 'some data' },
      },
      ],
    },
  ],
  eventsForSidebar: [
    {
      completed: true,
      inbound: {
        title: 'Inbound',
        subtitle: 'Received from the inbound service',
        headers: {
          method: 'Post',
          host: '192.125.2.2',
          contentType: 'application/json',
          contentLength: 6615,
          time: '5:28PM',
          date: '10-2-2012',
        },
        payload: { data: 'some data' },
      },
      outbounds: [{
        title: 'Outbound',
        subtitle: 'Sent to the outbound service',
        headers: {
          method: 'Post',
          contentType: 'application/json',
          contentLength: 6615,
          time: '5:29PM',
          date: '10-2-2012',
        },
        payload: {
          data: 'some data',
        },
      }, {
        title: 'Outbound',
        subtitle: 'Sent to the outbound service',
        headers: {
          method: 'Post',
          contentType: 'application/json',
          contentLength: 6615,
          time: '5:31PM',
          date: '10-2-2012',
        },
        payload: {
          data: 'some data',
        },
      },
      ],
      responses: [{
        title: 'Response',
        subtitle: 'Response from the outbound service',
        headers: {
          statusCode: 403,
          statusText: 'Forbidden',
          contentType: 'application/json',
          length: 6615,
          date: '17-10-2013',
          time: '5:30PM',
          latency: 796,
          size: 1.17,
        },
        payload: { data: 'some data' },
      }, {
        title: 'Response',
        subtitle: 'Response from the outbound service',
        headers: {
          statusCode: 200,
          statusText: 'OK',
          contentType: 'application/json',
          length: 6615,
          date: '17-10-2013',
          time: '5:32PM',
          latency: 796,
          size: 1.17,
        },
        payload: { data: 'some data' },
      },
      ],
    },
    {
      completed: true,
      inbound: {
        title: 'Inbound',
        subtitle: 'Received from the inbound service',
        headers: {
          method: 'Post',
          host: '192.125.2.2',
          contentType: 'application/json',
          contentLength: 6615,
          time: '5:28PM',
          date: '10-2-2012',
        },
        payload: { data: 'some data' },
      },
      outbounds: [{
        title: 'Outbound',
        subtitle: 'Sent to the outbound service',
        headers: {
          method: 'Post',
          contentType: 'application/json',
          contentLength: 6615,
          time: '5:29PM',
          date: '10-2-2012',
        },
        payload: {
          data: 'some data',
        },
      }, {
        title: 'Outbound',
        subtitle: 'Sent to the outbound service',
        headers: {
          method: 'Post',
          contentType: 'application/json',
          contentLength: 6615,
          time: '5:31PM',
          date: '10-2-2012',
        },
        payload: {
          data: 'some data',
        },
      },
      ],
      responses: [{
        title: 'Response',
        subtitle: 'Response from the outbound service',
        headers: {
          statusCode: 403,
          statusText: 'Forbidden',
          contentType: 'application/json',
          length: 6615,
          date: '17-10-2013',
          time: '5:30PM',
          latency: 796,
          size: 1.17,
        },
        payload: { data: 'some data' },
      }, {
        title: 'Response',
        subtitle: 'Response from the outbound service',
        headers: {
          statusCode: 500,
          statusText: 'Internal Server Error',
          contentType: 'application/json',
          length: 6615,
          date: '17-10-2013',
          time: '5:32PM',
          latency: 796,
          size: 1.17,
        },
        payload: { data: 'some data' },
      },
      ],
    },
    {
      completed: false,
      inbound: {
        title: 'Inbound',
        subtitle: 'Received from the inbound service',
        headers: {
          method: 'Post',
          host: '192.125.2.2',
          contentType: 'application/json',
          contentLength: 6615,
          time: '5:28PM',
          date: '10-2-2012',
        },
        payload: { data: 'some data' },
      },
      outbounds: [{
        title: 'Outbound',
        subtitle: 'Sent to the outbound service',
        headers: {
          method: 'Post',
          contentType: 'application/json',
          contentLength: 6615,
          time: '5:29PM',
          date: '10-2-2012',
        },
        payload: {
          data: 'some data',
        },
      }, {
        title: 'Outbound',
        subtitle: 'Sent to the outbound service',
        headers: {
          method: 'Post',
          contentType: 'application/json',
          contentLength: 6615,
          time: '5:31PM',
          date: '10-2-2012',
        },
        payload: {
          data: 'some data',
        },
      },
      ],
      responses: [{
        title: 'Response',
        subtitle: 'Response from the outbound service',
        headers: {
          statusCode: 403,
          statusText: 'Forbidden',
          contentType: 'application/json',
          length: 6615,
          date: '17-10-2013',
          time: '5:30PM',
          latency: 796,
          size: 1.17,
        },
        payload: { data: 'some data' },
      }, {
        title: 'Response',
        subtitle: 'Response from the outbound service',
        headers: {
          statusCode: 200,
          statusText: 'OK',
          contentType: 'application/json',
          length: 6615,
          date: '17-10-2013',
          time: '5:32PM',
          latency: 796,
          size: 1.17,
        },
        payload: { data: 'some data' },
      },
      ],
    },

  ],
};

const randomItem = {
  completed: true,
  inbound: {
    title: 'Inbound',
    subtitle: 'Received from the inbound service',
    headers: {
      method: 'Post',
      host: '192.125.2.2',
      contentType: 'application/json',
      contentLength: 6615,
      time: '5:28PM',
      date: '10-2-2012',
    },
    payload: { data: 'some data' },
  },
  outbounds: [{
    title: 'Outbound',
    subtitle: 'Sent to the outbound service',
    headers: {
      method: 'Post',
      contentType: 'application/json',
      contentLength: 6615,
      time: '5:29PM',
      date: '10-2-2012',
    },
    payload: {
      data: 'some data',
    },
  }, {
    title: 'Outbound',
    subtitle: 'Sent to the outbound service',
    headers: {
      method: 'Post',
      contentType: 'application/json',
      contentLength: 6615,
      time: '5:31PM',
      date: '10-2-2012',
    },
    payload: {
      data: 'some data',
    },
  },
  ],
  responses: [{
    title: 'Response',
    subtitle: 'Response from the outbound service',
    headers: {
      statusCode: 403,
      statusText: 'Forbidden',
      contentType: 'application/json',
      length: 6615,
      date: '17-10-2013',
      time: '5:30PM',
      latency: 796,
      size: 1.17,
    },
    payload: { data: 'some data' },
  }, {
    title: 'Response',
    subtitle: 'Response from the outbound service',
    headers: {
      statusCode: 200,
      statusText: 'OK',
      contentType: 'application/json',
      length: 6615,
      date: '17-10-2013',
      time: '5:32PM',
      latency: 796,
      size: 1.17,
    },
    payload: { data: 'some data' },
  },
  ],
};

export default Requests;
