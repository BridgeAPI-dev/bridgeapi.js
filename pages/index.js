import React, { useState } from 'react';
import {
  Card, Grid, Button, Container, Typography, Link, makeStyles,
} from '@material-ui/core';

import Navbar from '../components/shared/landing/Navbar';
import Footer from '../components/shared/Footer';
import ContactForm from '../components/ContactModal';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: 'white',
  },
  'mt-2': {
    marginTop: theme.spacing(2),
  },
  'mt-4': {
    marginTop: theme.spacing(4),
  },
  'mt-6': {
    marginTop: theme.spacing(6),
    fontWeight: 'bold',
  },
  'm-4': {
    margin: theme.spacing(4),
  },
  'm-6': {
    margin: theme.spacing(6),
  },
  manage: {
    backgroundColor: '#f6f7f8',
  },
}));

export default function Home() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div className={classes.root}>
      <Navbar />
      <ContactForm open={open} setOpen={setOpen} />

      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid container item xs={12} justify="center">
            <Typography variant="h3" component="h1" className={classes['mt-6']}>
              Bridge incompatible API&#39;s
            </Typography>
          </Grid>

          <Grid container item xs={12} alignItems="center" direction="column">
            <Typography variant="subtitle1">
              BridgeAPI is a serverless integration platform that
            </Typography>

            <Typography variant="subtitle1">
              lets you connect your apps through event-driven workflows
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

            <Typography variant="subtitle2" className={classes['m-6']}>
              Join the developers that are integrating API&#39;s around the world.
            </Typography>
          </Grid>
        </Grid>
      </Container>

      <Container maxWidth="lg" className={classes.manage}>
        <Grid container spacing={3}>
          <Grid container item xs={12} justify="center">
            <Typography variant="h6" component="h2" className={classes['mt-2']}>
              Advantages of BridgeAPI
            </Typography>
          </Grid>

          <Grid container item xs={12} alignItems="center" direction="column">
            <Grid container item direction="row" justify="center">
              <Card style={{
                padding: 14, margin: 14,
              }}
              >
                <Typography style={{ fontWeight: 'bold' }}>Customize each API request</Typography>
                <Typography>
                  Filter or complement the
                </Typography>
                <Typography>
                  data to send between apps
                </Typography>
              </Card>
              <Card style={{ padding: 14, margin: 14 }}>
                <Typography style={{ fontWeight: 'bold' }}>Monitor all API traffic in one place</Typography>
                <Typography>
                  No further need to manually inspect the
                </Typography>
                <Typography>
                  the API activity of every involved app
                </Typography>
              </Card>
            </Grid>
            <Grid container item direction="row" justify="center">
              <Card style={{ padding: 14, margin: 14 }}>
                <Typography style={{ fontWeight: 'bold' }}>Automate every workflow</Typography>
                <Typography>Once defined, incoming API</Typography>
                <Typography>requests trigger the </Typography>
                <Typography>workflow sequence</Typography>
              </Card>
              <Card style={{ padding: 14, margin: 14 }}>
                <Typography style={{ fontWeight: 'bold' }}>Protect your privacy</Typography>
                <Typography>We do not ask for app permissions.</Typography>
                <Typography>You chose which data to store</Typography>
                <Typography>in order to make successfull API requests</Typography>
              </Card>
            </Grid>

            <Typography variant="subtitle2" className={classes['mt-6']}>
              Some small test here
            </Typography>
          </Grid>
        </Grid>
      </Container>

      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid container item xs={12} justify="center">
            {/* <Typography variant="h5" component="h2" className={classes['m-4']}>
              Some Call To Action
            </Typography> */}

            <Link href="/users/signup">
              <Button
                color="primary"
                variant="contained"
                className={classes['m-4']}
              >
                Get Started Now
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Container>

      <Footer handleOpen={handleOpen} />
    </div>
  );
}
