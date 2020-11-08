import {
  Grid, Button, Container, Typography, Link, makeStyles,
} from '@material-ui/core';

import Navbar from '../components/shared/landing/Navbar';
import Footer from '../components/shared/Footer';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  'mt-2': {
    marginTop: theme.spacing(2),
  },
  'mt-4': {
    marginTop: theme.spacing(4),
  },
  'mt-6': {
    marginTop: theme.spacing(6),
  },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Navbar />
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid container item xs={12} justify="center">
            <Typography variant="h3" component="h1" className={classes['mt-6']}>
              Bridge Incompatible API&#39;s
            </Typography>
          </Grid>
          <Grid container item xs={12} alignItems="center" direction="column">
            <Typography variant="subtitle1">
              BridgeAPI is a serverless integration platform that
            </Typography>
            <Typography variant="subtitle1">
              empowers users to connect apps through event-driven workflows
            </Typography>
            <Link href="/users/signup">
              <Button
                color="primary"
                variant="contained"
                className={classes['mt-6']}
              >
                Get Started
              </Button>
            </Link>
            <Typography variant="subtitle2" className={classes['mt-6']}>
              Join the developers that are integrating API&#39;s around the world.
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid container item xs={12} justify="center">
            <Typography variant="h3" component="h1" className={classes['mt-6']}>
              Bridge Incompatible API&#39;s
            </Typography>
          </Grid>
          <Grid container item xs={12} alignItems="center" direction="column">
            <Typography variant="subtitle1">
              BridgeAPI is a serverless integration platform that
            </Typography>
            <Typography variant="subtitle1">
              empowers users to connect apps through event-driven workflows
            </Typography>
            <Link href="/users/signup">
              <Button
                color="primary"
                variant="contained"
                className={classes['mt-6']}
              >
                Get Started
              </Button>
            </Link>
            <Typography variant="subtitle2" className={classes['mt-6']}>
              Join the developers that are integrating API&#39;s around the world.
            </Typography>
          </Grid>
        </Grid>

      </Container>
      <Footer />

    </div>
  );
}