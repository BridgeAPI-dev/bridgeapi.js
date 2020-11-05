const randomEvent = {
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

export const SeedData = {
  title: 'Bridge1',
  url: 'https://bridgeapi.dev/event/8726933',
  event:
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
          url: 'https://slack.com/api/chat.postMessage',
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
          url: 'https://slack.com/api/chat.postMessage',
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
  sidebarEvents: [
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
// To fill up sidebar
let i = 20;
while (i > 0) {
  SeedData.sidebarEvents.unshift(randomEvent);
  i -= 1;
}

export default { SeedData };
