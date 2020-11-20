import React from 'react';
import Link from 'next/link';
import {
  AppBar, Toolbar, Typography, makeStyles, Grid,
} from '@material-ui/core';
import logo from '../../../../src/images/logo.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: '50px',
  },
  appbar: {
    alignItems: 'right',
    backgroundColor: 'white',
    color: 'rgb(80, 82, 86)',
    flexGrow: 1,
  },
  toolbar: {
    minHeight: 46,
    flexGrow: 1,
  },
  login: {
    marginRight: theme.spacing(1),
    padding: '5px',
    '&:hover': {
      color: '#000',
    },
  },
  signup: {
    backgroundColor: '#f1f2f4',
    borderRadius: '5px',
    paddingRight: '5px',
    paddingLeft: '5px',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    '&:hover': {
      color: '#000',
    },
  },
}));

export default function Navbar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appbar}>
        <Toolbar className={classes.toolbar}>
          <Link href="/">
            <img src={logo} width={150} alt="BridgeAPI logo depicting an arch bridge" />
          </Link>

          <Grid container justify="flex-end">
            <Typography variant="subtitle1" className={classes.login}>
              <Link href="/users/login">
                Login
              </Link>
            </Typography>
            <Typography
              variant="subtitle1"
              className={classes.signup}
            >
              <Link href="/users/signup">
                Sign Up
              </Link>
            </Typography>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}
