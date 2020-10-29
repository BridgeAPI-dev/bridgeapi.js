import React from 'react';
import Link from 'next/link';
import {
  AppBar, Toolbar, Typography, IconButton, makeStyles, Grid,
} from '@material-ui/core';
import { FaPlus as Logo } from 'react-icons/fa';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: '70px',
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
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
            >
              <Logo />
            </IconButton>
          </Link>

          <Grid container justify="flex-end">
            <Typography variant="subtitle1" className={classes.login}>
              <Link href="/login">
                Login
              </Link>
            </Typography>
            <Typography
              variant="subtitle1"
              className={classes.signup}
            >
              <Link href="/signup">
                Sign Up
              </Link>
            </Typography>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}
