import {
  Grid, makeStyles, Container, Typography,
} from '@material-ui/core';
import Link from 'next/link';
import logo from '../../../public/logo.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#f6f7f8',
  },
  mainGrid: {
    padding: theme.spacing(2),
  },
  'mr-6': {
    marginRight: theme.spacing(6),
  },
  'mt-2': {
    marginTop: theme.spacing(2),
  },
}));

function Footer() {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Grid container spacing={3} className={classes.mainGrid}>
        <img src={logo} width="150" alt="logo" />

        <Grid container item spacing={3} justify="center">
          <Typography variant="subtitle1" className={classes['mr-6']}>
            <Link href="/users/login">
              Login
            </Link>
          </Typography>

          <Typography variant="subtitle1" className={classes['mr-6']}>
            <Link href="/users/signup">
              Sign Up
            </Link>
          </Typography>

          <Typography variant="subtitle1" className={classes['mr-6']}>
            <Link href="/about">
              About
            </Link>
          </Typography>

          <Typography variant="subtitle1">
            <Link href="/contact">
              Contact Us
            </Link>
          </Typography>
        </Grid>

        <Grid container item spacing={3} justify="center">
          <Typography variant="subtitle1" className={classes['mt-2']}>
            Made with
            {' '}
            <span role="img" aria-label="heart icon">❤️</span>
            {' '}
            by WAA
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Footer;
