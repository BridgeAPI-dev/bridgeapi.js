/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import {
  Divider,
  Grid,
  Link,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Typography,
} from '@material-ui/core';

const populateSidebar = ({ events }) => events.slice().reverse().map((ev) => {
  const { date, statusCode, time } = ev.responses.slice(-1)[0].headers;
  return (
    <ListItem divider>
      <ListItemText>
        <Typography
          style={{ fontSize: '0.7em' }}
          align={ev.completed ? 'right' : 'center'}
          noWrap
        >
          {ev.completed ? `${time} - ${date} ${statusCode}` : 'Ongoing' }
        </Typography>
      </ListItemText>
    </ListItem>
  );
});

const useStyles = makeStyles({
  title: { fontWeight: '600', marginTop: '-1em' },
  gridScroll: {
    maxHeight: 'calc(100vh - 50px)',
    overflow: 'scroll',
    paddingLeft: 10,
    paddingRight: 0,
  },
});

function Sidebar({ events, title }) {
  const classes = useStyles();
  return (
    <Grid
      item
      direction="column"
      xs={2.5}
      className={classes.gridScroll}
    >
      <List>
        <Link href="/editor">
          <Typography variant="h6" align="center" className={classes.title}>{title}</Typography>
        </Link>
        <Divider />
        {populateSidebar({ events })}
      </List>
    </Grid>
  );
}

export default Sidebar;

Sidebar.propTypes = {
  events: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
};
