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
              <Card style={{ padding: 14 }}>
                <Typography>Customize each workflow</Typography>
                {/* SMALL TEXT: alter or complement the data
                you want sent between apps */}
              </Card>
              <Card style={{ padding: 14 }}>
                <Typography>Monitor all your webhooks in one place</Typography>
                {/* SMALL TEXT: No more need to log in to every app to inspect
                its webhook activity, it's all available from the BridgeAPI dashboard */}
              </Card>
            </Grid>
            <Grid container item direction="row" justify="center">
              <Card style={{ padding: 14 }}>
                <Typography>Automate every workflow</Typography>
                {/* SMALL TEXT: Once defined, Workflows are triggered and execute automatically */}
              </Card>
              <Card style={{ padding: 14 }}>
                <Typography>Protect your privacy</Typography>
                {/* SMALL TEXT: We do not ask for any permissions
                to reach into your connected apps With bridgeAPI as the go-between,
                your connected apps can gather only limited data on your private workflows */}
              </Card>
            </Grid>
            {/*
            <Typography variant="subtitle1">
              Maybe a 2 x 2 grid with some icons and light text on the right side.
            </Typography> */}
            {/* <Typography variant="subtitle1">
              dont ask me what to do for this box. I am out of ideas.
            </Typography> */}

            <Typography variant="subtitle2" className={classes['mt-6']}>
              Some small test here
            </Typography>
          </Grid>
        </Grid>
      </Container>

      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid container item xs={12} justify="center">
            <Typography variant="h5" component="h2" className={classes['m-4']}>
              Some Call To Action
            </Typography>

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
