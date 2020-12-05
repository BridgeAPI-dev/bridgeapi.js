import PropTypes from 'prop-types';
import {
  Grid, makeStyles, Container, Typography, Divider,
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

function Footer({ handleOpen }) {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Grid container spacing={3} className={classes.mainGrid}>
        <Container>
          <img src={logo} width="150" alt="logo" />
        </Container>

        <Container maxWidth="md" style={{ marginTop: '0.5rem' }}>
          <Grid item spacing={3} maxWidth>
            <Typography>
              About Us
            </Typography>

            <Typography>
              Our team has built internet scale applications and managed
              data pipelines in excess of 10 million events per second at
              startups and high-growth environments like BrightRoll, Yahoo!, Affirm and Instacart.

              We
              {' '}
              <span role="img" aria-label="heart icon">❤️</span>
              {' '}
              building platforms and hope Pipedream simplifies your next project or business.
            </Typography>
          </Grid>

          <Divider flexItem style={{ width: '100%', margin: '1rem 0', border: '1px solid' }} />
        </Container>

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

          <Typography
            variant="subtitle1"
            onClick={() => handleOpen()}
            // style={{ ':hover': 'cursor:pointer' }}
          >
            Contact Us
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

Footer.propTypes = {
  handleOpen: PropTypes.func.isRequired,
};
