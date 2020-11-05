import PropTypes from 'prop-types';
import {
  Grid,
  Paper,
  makeStyles,
  Container,
  Divider,
  Typography,
  Link,
} from '@material-ui/core';
import Navbar from '../components/shared/dashboard/Navbar';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
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

function Dashboard({ bridges }) {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <Navbar />
        <Container maxWidth="md">
          <Grid container spacing={2}>

            {bridges && bridges.map((bridge) => (
              <Grid item xs={12} sm={6} md={4} key={`main-grid-${bridge.title}`}>
                <Paper className={classes.paper}>
                  <Link href={`/editor/${bridge.slug}`}>
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
                      <Typography variant="subtitle1">{bridge.lastRequest}</Typography>
                      <Typography variant="subtitle1">{bridge.updatedAt}</Typography>
                      <Typography variant="subtitle1">{bridge.requests}</Typography>
                    </Grid>
                  </Grid>

                  <Divider light className={classes.paddedDivider} />
                  <Grid container spacing={2} style={{ textAlign: 'left' }}>
                    <Grid item xs container spacing={2}>
                      <Grid item xs>
                        <Link href={`/requests/${bridge.requestSlug}`}>
                          <Typography variant="subtitle1" color="secondary">
                            View Requests
                          </Typography>
                        </Link>
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            ))}

          </Grid>
        </Container>
      </div>
    </>
  );
}

export default Dashboard;

// eslint-disable-next-line no-unused-vars
export async function getStaticProps(context) {
  return {
    props: {
      bridges: [
        {
          title: 'test title 1',
          updatedAt: Date.now(),
          lastRequest: Date.now(),
          requests: '10',
          slug: '94',
          requestSlug: '78',
        },
        {
          title: 'test title 2',
          updatedAt: Date.now(),
          lastRequest: Date.now(),
          requests: '15',
          slug: '94',
          requestSlug: '78',
        },
        {
          title: 'test title 3',
          updatedAt: Date.now(),
          lastRequest: Date.now(),
          requests: '20',
          slug: '94',
          requestSlug: '78',
        },
        {
          title: 'test title 4',
          updatedAt: Date.now(),
          lastRequest: Date.now(),
          requests: '25',
          slug: '94',
          requestSlug: '78',
        },
        {
          title: 'test title 5',
          updatedAt: Date.now(),
          lastRequest: Date.now(),
          requests: '30',
          slug: '94',
          requestSlug: '78',
        },
      ],
    },
  };
}

Dashboard.propTypes = {
  bridges: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      updatedAt: PropTypes.number.isRequired,
      lastRequest: PropTypes.number.isRequired,
      requests: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
