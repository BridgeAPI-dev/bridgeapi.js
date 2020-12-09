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
        {/* <Container>
          <img src={logo} width="150" alt="logo" />
        </Container> */}

        <Container maxWidth="md" style={{ marginTop: '0.5rem' }}>
          <Grid item spacing={3} maxWidth>
            <Typography style={{ fontWeight: 'bold' }}>
              About Us
            </Typography>

            <Typography>
              We are three developers whose goal is to provide an intuitive tool to receive,
              filter and forward API requests in order to automate workflows.
            </Typography>
            <br />
            <Typography>
              Current options for developers usually require subscribing to bloated
              services and granting intrusive permissions in order to connect apps.
              With BridgeAPI, simply define your desired workflow and direct your
              vendor webhooks or API calls toward your provided BridgeAPI endpoint.
            </Typography>
            <br />
            <Typography>
              Our service is open source, permission free and fully customizable.
              We hope you enjoy our product and we appreciate any feedback or suggestion
              that can help us improve it further.
            </Typography>
          </Grid>

          <Divider flexItem style={{ width: '100%', margin: '1rem 0', border: '1px solid' }} />
        </Container>
        {/* <Container>
          <img src={logo} width="150" alt="logo" />
        </Container> */}

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
            by AWA
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
