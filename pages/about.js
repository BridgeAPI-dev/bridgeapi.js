import React from 'react';
import {
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import Footer from '../components/shared/Footer';

// import brand from '../public/brand.svg';
import Navbar from '../components/shared/landing/Navbar';
import Andrew from '../components/About/Members/Andrew';
import William from '../components/About/Members/William';
import Angel from '../components/About/Members/Angel';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: 'white',
    padding: theme.spacing(5, 3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(5, 15),
    },
    marginBottom: theme.spacing(5),
  },
  header: {
    fontWeight: '500',
    color: theme.palette.secondary.main,
  },
  avatars: {
    margin: theme.spacing(3, 0),
  },
}));

export default function About() {
  // const [width, setWidth] = useState(0);
  const classes = useStyles();

  // useEffect(() => {
  //   if (document) {
  //     setWidth(document.getElementById('brand_container').getBoundingClientRect().width);
  //   }
  // }, []);

  return (
    <div>
      <div className={classes.root}>
        <Navbar />
        <Grid container align="center" justify="center" spacing={5}>
          {/* <Grid item xs={2} id="brand_container">
          <img style={{ width: '100%', height: '100%' }} src={brand} alt="brand" />
        </Grid> */}
          <Grid item xs={10}>
            <Typography variant="h2" className={classes.header}>Our Team</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body1">
              We built BridgeAPI by collaborating remotely in the United States. We
              are looking for opportunities, so please contact us if you think we
              can contribute to your team.
            </Typography>
          </Grid>
          <Grid container className={classes.avatars} justify="center">
            <Grid container xs={12} md={10} spacing={4}>
              <Grid item xs={12} md={4}>
                <Andrew />
              </Grid>
              <Grid item xs={12} md={4}>
                <William />
              </Grid>
              <Grid item xs={12} md={4}>
                <Angel />
              </Grid>
            </Grid>
          </Grid>
        </Grid>

      </div>
      <Footer />
    </div>
  );
}
