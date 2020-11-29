/* eslint-disable react/forbid-prop-types */
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

const useStyles = makeStyles(() => ({
  title: {
    fontWeight: '600',
  },
  root: {
    zIndex: 900,
    position: 'relative',
  },
  drawer: {
    width: 180,
  },
  drawerPaper: {
    width: 180,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  toolbar: {
    minHeight: 46,
  },
}));

function Sidebar({ events, title }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar className={classes.toolbar} />
        <div className={classes.drawerContainer}>
          <List>
            <Link href={`/bridges/${events && events[0] ? events[0].bridge_id : 'new'}`}>
              <Typography variant="h6" align="center" className={classes.title}>{title || 'Untitled'}</Typography>
            </Link>
            <Divider />
            {events && events.map((event) => (
              <ListItem
                completedAt={event.completedAt}
                statusCode={event.statusCode}
                completed={event.completed}
              />
            ))}
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
