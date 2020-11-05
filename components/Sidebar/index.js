/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import {
  Divider,
  Grid,
  Link,
  List,
  makeStyles,
  Typography,
  Toolbar,
  Drawer,
} from '@material-ui/core';

import ListItem from './ListItem';

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: '600',
  },
  root: {
    // marginTop: '50px',
    // maxHeight: 'calc(100vh - 50px)',
    // overflowY: 'auto',
    // paddingRight: '0 !important',
    // paddingTop: '0 !important',
    // backgroundColor: 'white',
    zIndex: 900,
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
    <div style={{ zIndex: 900, position: 'relative' }}>
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
            <Link href="/editor/32">
              <Typography variant="h6" align="center" className={classes.title}>{title}</Typography>
            </Link>
            <Divider />
            {events.slice().reverse().map((evt) => {
              const { date, statusCode, time } = evt.responses.slice(-1)[0].headers;
              return (
                <ListItem
                  date={date}
                  statusCode={statusCode}
                  timestamp={time}
                  completed={evt.completed}
                />
              );
            })}
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
