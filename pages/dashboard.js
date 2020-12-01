import PropTypes from 'prop-types';
import {
  Grid,
  makeStyles,
  Container,
  Typography,
} from '@material-ui/core';

import Card from '../components/Dashboard/Card';
import Navbar from '../components/shared/dashboard/Navbar';

import fetchDataOrRedirect from '../utils/ssrRedirect';
import ProtectRoute from '../utils/ProtectRoute';
import toCamel from '../utils/toCamel';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  'mt-10': {
    marginTop: theme.spacing(10),
  },
}));

function Dashboard({ bridges }) {
  const classes = useStyles();

  return (
    <ProtectRoute>
      <div className={classes.root}>
        <Navbar />
        <Container maxWidth="lg">
          <Grid container spacing={2} id="dashboard-card-container">

            {bridges && bridges.length > 0
              ? (bridges.map((bridge, idx) => <Card bridge={bridge} key={bridge} index={idx} />))
              : (
                <Grid item xs={12}>
                  <Typography
                    align="center"
                    className={classes['mt-10']}
                    variant="h5"
                    color="textSecondary"
                  >
                    Looks like you don&#39;t have any bridges. Why not create one?
                  </Typography>
                </Grid>
              )}

          </Grid>
        </Container>
      </div>
    </ProtectRoute>
  );
}

export default Dashboard;

export async function getServerSideProps(context) {
  const res = await fetchDataOrRedirect(context, '/bridges');
  if (!res) return { props: {} }; // Redirecting to /users/login

  return {
    props: {
      bridges: toCamel(res.data.bridges),
    },
  };
}

Dashboard.propTypes = {
  bridges: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired,
      lastRequest: PropTypes.string.isRequired,
      requests: PropTypes.string.isRequired,
      eventId: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
