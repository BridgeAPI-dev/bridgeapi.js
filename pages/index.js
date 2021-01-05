import React, { useState } from 'react';
import {
  Button,
  Container,
  Grid,
  makeStyles, Typography,
} from '@material-ui/core';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '../components/shared/Footer';

import Navbar from '../components/shared/landing/Navbar';
import ContactForm from '../components/ContactModal';
import dashboard from '../public/dashboard.png';
import headers from '../public/headers.png';
import environmentVariables from '../public/environment variables.png';
import payload from '../public/payload.png';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: 'white',
  },
  main: {
    backgroundColor: theme.palette.offWhite.main,
    padding: theme.spacing(10, 0),
  },
  blue: {
    backgroundColor: theme.palette.offWhite.main,
    padding: theme.spacing(15, 10),
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(15, 5),
    },
  },
  header: {
    fontWeight: 700,
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(5),
  },
  mainText: {
    fontSize: '1.2rem',
    marginBottom: theme.spacing(5),
  },
  button: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    fontWeight: '600',
    fontSize: '1.1rem',
    borderRadius: theme.spacing(1.25),
    padding: theme.spacing(1.2, 3.5),
    marginBottom: theme.spacing(6),
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
    },
  },
  paddedContainer: {
    padding: theme.spacing(15, 0),
    margin: theme.spacing(0, 10),
    [theme.breakpoints.down('md')]: {
      margin: theme.spacing(0, 5),
    },
  },
  environmentVariablesImage: {
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(5),
    },
  },
  imgFluid: {
    height: 'auto',
    width: '100%',
  },
  centerImg: {

  },
}));

export default function Home() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  return (
    <div className={classes.root}>
      <Navbar />
      <ContactForm open={open} setOpen={setOpen} />
      <Container maxWidth="xl" style={{ padding: 0 }}>
        <Grid container justify="center" align="center" className={classes.main}>
          <Grid container item xs={8} justify="center">
            <Typography variant="h2" className={classes.header}>Bridge Incompatible API&apos;s</Typography>
          </Grid>
          <Grid container item xs={10} md={6}>
            <Typography variant="body1" className={classes.mainText}>
              BridgeAPI is a serverless integration platform that
              lets you connect your apps through event-driven workflows.
              <br />
              <br />
              Current options
              for developers usually require subscribing to bloated services and granting
              intrusive permissions in order to connect apps.
              <br />
              <br />
              With BridgeAPI, simply define
              your desired workflow and direct your vendor&apos;s webhooks or API calls towards
              your bridge&apos;s provided endpoint.

            </Typography>
          </Grid>
          <Grid item xs={12} align="center">
            <Link href="/users/signup">
              <Button className={classes.button}>Sign Up Now</Button>
            </Link>
          </Grid>
          {/* <div style={{ maxWidth: '500px' }}>
            <Image layout="responsive" width={500} height={500} src={dashboard} alt="header" />
          </div> */}

        </Grid>
        <Grid container>
          <Grid container className={classes.paddedContainer}>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" className={classes.header}>Fully customizable requests</Typography>
              <Typography variant="body1" className={classes.mainText}>
                BridgeAPI gives developers the ability to connect APIs easily,
                regardless of any differences. One of those differences being
                the headers they expect. You&apos;re able to easily define any headers needed
                quickly with our service, even ones that must be generated
                dynamically.
                <br />
                <br />
                You can access data from the payload sent to your bridge
                using
                {' '}
                <code>$payload.key_name</code>
                , and your environment variables with
                {' '}
                <code>$env.key_name</code>
                .
                This allows you to create dynamic headers without issue.
                <br />
                <br />
                We give users the flexibility they need, so they
                can focus on what matters most: productivity.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <img className={classes.imgFluid} src={headers} alt="header" />
            </Grid>
          </Grid>
          <Grid container item xs={12} className={classes.blue}>
            <Grid container alignItems="center" item xs={12} md={6} className={classes.environmentVariablesImage}>
              <img className={classes.imgFluid} src={environmentVariables} alt="header" />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" className={classes.header}>Keep your information safe</Typography>
              <Typography variant="body1" className={classes.mainText}>
                Your security & privacy are important to us. When you create an
                environment variable, it is encrypted and hidden from view to
                keep it safe.
                <br />
                <br />
                Once an environment variable has been created, you&apos;ll be able to
                access it in the headers & settings or payload sections. For
                example, if you created an environment variable named
                {' '}
                <code>API_KEY</code>
                , you&apos;d be able to access its value with
                {' '}
                <code>$env.API_KEY</code>
                .
                <br />
                <br />
                BridgeAPI does not request intrusive permissions to access your essential apps.
              </Typography>
            </Grid>
          </Grid>
          <Grid container className={classes.paddedContainer}>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" className={classes.header}>Bridge almost any API together</Typography>
              <Typography variant="body1" className={classes.mainText}>
                You must be able to send webhooks from service A to your bridge&apos;s URL. Service
                B must then accept BridgeAPI&apos;s webhooks. This should allow any two services
                to be bridged together, regardless if they were ever meant to be.
                <br />
                <br />
                You&apos;ll then craft a JSON payload in the format expected by service B in this
                section here. You&apos;re able to reference
                values from service A&apos;s payload using
                {' '}
                <code>$payload </code>
                {' '}
                and the name of the key.
                <br />
                <br />
                For example, if you need the value of the key first_name, you&apos;d write out
                {' '}
                <code>$payload.first_name.</code>
                {' '}
                You can also access your environment variables, in the same
                way, using
                {' '}
                <code>$env</code>
                .
              </Typography>
              <Link href="/users/signup">
                <Button className={classes.button}>Try It Now</Button>
              </Link>
            </Grid>
            <Grid container alignItems="center" item xs={12} md={6}>
              <img className={classes.imgFluid} src={payload} alt="header" />
            </Grid>
          </Grid>
        </Grid>
      </Container>

      <Footer />
    </div>
  );
}
