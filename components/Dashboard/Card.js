import PropTypes from 'prop-types';
import {
  Grid,
  Paper,
  makeStyles,
  Divider,
  Typography,
  Link,
} from '@material-ui/core';

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

function Card({ bridge }) {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={6} md={4} key={`main-grid-${bridge.title}`}>
      <Paper className={classes.paper}>
        <Link href={`/bridge/${bridge.id}`}>
          <Typography
            variant="h5"
            color="primary"
            className={classes.title}
            style={{ fontWeight: 600 }}
          >
            {bridge.title}
          </Typography>
        </Link>
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
            </Grid>
          </Grid>

          <Grid item xs container direction="column" className={classes.values}>
            <Typography variant="subtitle1">{bridge.lastRequest || 'No requests'}</Typography>
            <Typography variant="subtitle1">
              {(new Date(bridge.updatedAt)).toUTCString().split(' ').slice(1, 4)
                .join(' ')}
            </Typography>
            <Typography variant="subtitle1">{bridge.requests || '0'}</Typography>
          </Grid>
        </Grid>

        <Divider light className={classes.paddedDivider} />
        <Grid container spacing={2} style={{ textAlign: 'left' }}>
          <Grid item xs container spacing={2}>
            <Grid item xs>
              {/* TODO: Should be request id */}
              <Link href={`/requests/${bridge.id}`}>
                <Typography variant="subtitle1" color="secondary">
                  View Requests
                </Typography>
              </Link>
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
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    lastRequest: PropTypes.string,
    requests: PropTypes.string,
  }).isRequired,
};
