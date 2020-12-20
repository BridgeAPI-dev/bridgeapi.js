/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Divider,
  List,
  makeStyles,
  Typography,
  Toolbar,
  Drawer,
} from '@material-ui/core';
import Link from 'next/link';

import ListItem from './ListItem';
import Loader from '../Loader';

const useStyles = makeStyles(() => ({
  title: {
    fontWeight: '600',
  },
  root: {
    zIndex: 900,
    position: 'relative',
  },
  drawer: {
    width: '180px',
  },
  drawerPaper: {
    width: 180,
  },
  drawerPaperNoOverflow: {
    width: 180,
    overflow: 'hidden',
  },
  toolbar: {
    minHeight: 46,
  },
}));

function Sidebar({ events, bridgeSlug, title }) {
  const classes = useStyles();
  const [mounted, setMounted] = useState(false);
  const [sortedEvents, setSortedEvents] = useState([]);

  function sortEvents() {
    const ongoingEvents = [];
    const completedEvents = [];
    events.forEach((event) => {
      if (!event.completed) {
        ongoingEvents.push(event);
      } else {
        completedEvents.push(event);
      }
    });
    setSortedEvents(ongoingEvents.concat(completedEvents));
  }

  useEffect(() => {
    setTimeout(() => setMounted(true), 1000);
    sortEvents();
  }, []);

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: mounted ? classes.drawerPaper : classes.drawerPaperNoOverflow,
        }}
      >
        <Toolbar className={classes.toolbar} />
        <div
          style={{ overflow: mounted ? 'auto' : 'hidden' }}
        >
          <List>
            <Typography variant="h6" align="center" className={classes.title}>
              <Link href={`/bridge/${bridgeSlug}`}>
                {title || 'Untitled'}
              </Link>
            </Typography>

            <Divider />
            {!mounted
              ? (
                <Loader />
              ) : (
                sortedEvents && sortedEvents.map((event) => (
                  <ListItem
                    completedAt={event.completedAt}
                    statusCode={event.statusCode}
                    completed={event.completed}
                    eventId={event.id}
                  />
                ))
              )}
          </List>
        </div>
      </Drawer>
    </div>
  );
}

export default Sidebar;

Sidebar.propTypes = {
  events: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  bridgeSlug: PropTypes.string.isRequired,
};
