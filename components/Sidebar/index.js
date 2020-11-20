/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Divider,
  Link,
  List,
  makeStyles,
  Typography,
  Toolbar,
  Drawer,
} from '@material-ui/core';

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

function Sidebar({ events, title }) {
  const classes = useStyles();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setMounted(true), 2500);
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
            <Link href="/editor/32">
              <Typography variant="h6" align="center" className={classes.title}>{title}</Typography>
            </Link>
            <Divider />
            {!mounted
              ? (
                <Loader />
              ) : (
                events.map((event) => {
                  const { completed, completedAt, statusCode } = event;
                  return (
                    <ListItem
                      statusCode={statusCode}
                      completedAt={completedAt}
                      completed={completed}
                    />
                  );
                })
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
};
