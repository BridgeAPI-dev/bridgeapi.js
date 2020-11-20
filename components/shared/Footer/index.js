import {
  Grid, makeStyles, Container, Typography, Link,
} from '@material-ui/core';
import logo from '../../../src/images/logo.svg';

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
        <Link href="/">
          <img src={logo} width={150} alt="BridgeAPI logo of a bridge" />
        </Link>

        <Grid container item spacing={3} justify="center">
          <Link href="/users/login">
            <Typography variant="subtitle1" className={classes['mr-6']}>
              Login
            </Typography>
          </Link>

          <Link href="/users/signup">
            <Typography variant="subtitle1" className={classes['mr-6']}>
              Sign Up
            </Typography>
          </Link>

          <Link href="/about">
            <Typography variant="subtitle1" className={classes['mr-6']}>
              About
            </Typography>
          </Link>

          <Link href="/docs">
            <Typography variant="subtitle1">
              Docs
            </Typography>
          </Link>
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
