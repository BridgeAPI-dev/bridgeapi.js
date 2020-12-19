import React, { useState } from 'react';
import {
  Button,
  Container,
  Grid,
  makeStyles, Typography,
} from '@material-ui/core';

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
  blue: {
    backgroundColor: theme.palette.offWhite.main,
  },
  header: {
    fontWeight: 600,
    color: theme.palette.primary.main,
  },
  mainText: {
    padding: theme.spacing(0, 8),
  },
  button: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    fontWeight: '600',
    fontSize: '1.1rem',
    padding: theme.spacing(1.2, 3.5),
  },
}));

export default function Home() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  return (
    <div className={classes.root}>
      <Navbar />
      <ContactForm open={open} setOpen={setOpen} />
      <Container maxWidth="xl" align="center" style={{ padding: 0 }}>
        <Grid container justify="center" className={classes.blue}>
          <Grid container xs={8} justify="center">
            <Typography variant="h3" className={classes.header}>Amet nam ornare urna mauris in in.</Typography>
          </Grid>
          <Grid container xs={8}>
            <Typography variant="body1" className={classes.mainText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dolor posuere id et sit viverra egestas tristique. Donec viverra eget fringilla euismod velit tortor. Id mauris a euismod tortor neque </Typography>
          </Grid>
          <Grid item xs={12}>
            <Button className={classes.button}>Sign Up Now</Button>
          </Grid>
          <img style={{ display: 'block' }} src={dashboard} alt="header" />
        </Grid>
        <Grid container>
          <Grid container>
            <Grid item xs={6}>
              <Typography variant="h4" className={classes.header}>Amet nam ornare urna mauris in in.</Typography>
              <Typography variant="body1" className={classes.mainText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dolor posuere id et sit viverra egestas tristique. Donec viverra eget fringilla euismod velit tortor. Id mauris a euismod tortor neque </Typography>
            </Grid>
            <Grid item xs={6}>
              <img style={{ width: '100%', height: '100%' }} src={headers} alt="header" />
            </Grid>
          </Grid>
          <Grid container xs={12} className={classes.blue}>
            <Grid item xs={6}>
              <img style={{ width: '100%', height: '100%' }} src={environmentVariables} alt="header" />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h4" className={classes.header}>Store Sensitive Information Safely</Typography>
              <Typography variant="body1" className={classes.mainText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dolor posuere id et sit viverra egestas tristique. Donec viverra eget fringilla euismod velit tortor. Id mauris a euismod tortor neque </Typography>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h4" className={classes.header}>Amet nam ornare urna mauris in in.</Typography>
            <Typography variant="body1" className={classes.mainText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dolor posuere id et sit viverra egestas tristique. Donec viverra eget fringilla euismod velit tortor. Id mauris a euismod tortor neque </Typography>
          </Grid>
          <Grid item xs={6}>
            <img style={{ width: '100%', height: '100%' }} src={payload} alt="header" />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
