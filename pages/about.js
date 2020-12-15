import React, { useEffect, useState } from 'react';
import {
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';

import brand from '../public/full_logo.svg';
import Navbar from '../components/shared/landing/Navbar';
import Andrew from '../components/About/Andrew';
import William from '../components/About/William';
import Angel from '../components/About/Angel';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: 'white',
    padding: theme.spacing(5, 15),
  },
  header: {
    fontWeight: '500',
    color: theme.palette.secondary.main,
  },
  avatars: {
    marginBottom: theme.spacing(3),
  },
}));

export default function Home() {
  const [width, setWidth] = useState(0);
  const classes = useStyles();

  useEffect(() => {
    if (document) {
      setWidth(document.getElementById('brand_container').getBoundingClientRect().width);
    }
  }, []);

  return (
    <div className={classes.root}>
      <Navbar />
      <Grid container align="center" spacing={5}>
        <Grid item xs={2} id="brand_container">
          <img style={{ width: '100%', height: '100%' }} src={brand} alt="brand" />
        </Grid>
        <Grid item xs={10} style={{ marginLeft: `-${width / 2}px` }}>
          <Typography variant="h2" className={classes.header}>Our Team</Typography>
        </Grid>
        <Grid container className={classes.avatars} justify="center">
          <Grid container xs={10} md={8} spacing={4}>
            <Grid item xs={4}>
              <Andrew />
            </Grid>
            <Grid item xs={4}>
              <William />
            </Grid>
            <Grid item xs={4}>
              <Angel />
            </Grid>
          </Grid>
        </Grid>
        <Grid container>
          <Typography variant="h4" className={classes.header}>About Us</Typography>
          <Grid item xs={12} align="left" style={{ marginTop: '20px' }}>
            <Typography variant="body1" style={{ textIndent: '40px' }}>
              We are three developers whose goal is to provide an intuitive tool
              to receive, filter, and forward API requests to automate workflows.
              Current options for developers usually require subscribing to bloated
              services and granting intrusive permissions to connect apps. With BridgeAPI,
              simply define your desired workflow and direct your vendor webhooks
              or API calls towards your provided BridgeAPI endpoint.
            </Typography>
            <br />
            <Typography variant="body1" style={{ textIndent: '40px' }}>
              Our service is open source, permission free, and fully customizable.
              We hope you enjoy our product, and we appreciate any feedback or suggestion
              that can help us improve it further.
            </Typography>

          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
