import PropTypes from 'prop-types';
import {
  Grid,
  Paper,
  makeStyles,
  Divider,
  Typography,
  // Link,
} from '@material-ui/core';
import Link from 'next/link';

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: 'center',
  },
  values: {
    textAlign: 'right',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  paddedDivider: {
    margin: '10px 0',
  },
}));

function Card({ bridge, index }) {
  const classes = useStyles();

  const completedAt = (bridge.completedAt
    && new Date(bridge.completedAt).toDateString())
    || 'No requests';

  const updatedAt = new Date(bridge.updatedAt).toDateString();

  return (
    <Grid item xs={12} sm={6} md={4} key={`main-grid-${bridge.title}`}>
      <Paper className={classes.paper} id={`card-${index}`}>
        <Typography
          variant="h5"
          color="primary"
          className={classes.title}
          style={{ fontWeight: 600 }}
          id={`card-title-${index}`}
        >
          <Link href={`/bridge/${bridge.slug}`}>
            {bridge.title}
          </Link>
        </Typography>

        <Divider light className={classes.paddedDivider} />

        <Grid container spacing={2}>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography variant="subtitle1">
                Latest request:
              </Typography>
              <Typography variant="subtitle1">
                Last modified:
              </Typography>
              <Typography variant="subtitle1">
                Total Requests:
              </Typography>
              <Typography variant="subtitle1">
                State:
              </Typography>
            </Grid>
          </Grid>

          <Grid item xs container direction="column" className={classes.values}>
            <Typography variant="subtitle1" id={`card-completedAt-${index}`}>
              {completedAt}
            </Typography>

            <Typography variant="subtitle1" id={`card-updateAt-${index}`}>
              {updatedAt}
            </Typography>

            <Typography variant="subtitle1" id={`card-eventCount-${index}`}>
              {bridge.eventCount || '0'}
            </Typography>

            <Typography variant="subtitle1" id={`card-active-${index}`}>
              {bridge.active ? 'Active' : 'Deactivated'}
            </Typography>
          </Grid>
        </Grid>

        <Divider light className={classes.paddedDivider} />
        <Grid container spacing={2} style={{ textAlign: 'left' }}>
          <Grid item xs container spacing={2}>
            <Grid item xs>
              {bridge.eventId ? (

                <Typography
                  variant="subtitle1"
                  color="secondary"
                  id={`card-events-${index}`}
                >
                  <Link href={`/events/${bridge.eventId}`}>
                    View Events
                  </Link>
                </Typography>
              ) : (
                <Typography variant="subtitle1" id={`card-events-${index}`}>
                  View Events
                </Typography>
              )}

            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}

export default Card;

Card.propTypes = {
  bridge: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    eventCount: PropTypes.number.isRequired,
    completedAt: PropTypes.string,
    active: PropTypes.bool.isRequired,
    eventId: PropTypes.number.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};
