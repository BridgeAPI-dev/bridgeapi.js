import {
  Grid,
  Paper,
  makeStyles,
  Typography,
  Divider,
} from '@material-ui/core';
import Navbar from '../components/shared/dashboard/navbar';
import theme from '../src/theme';

const useStyles = makeStyles(() => {});

function Dashboard(props) {
  const classes = useStyles();
  return (
    <>
      <Navbar />
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={4}>
            {props.data.map((bridge) => (
              <Grid key={bridge} item display="flex">
                <Paper className={classes.paper}>
                  <Typography variant="h2">{bridge.title}</Typography>
                  <Divider />
                  <Typography variant="p" flexDirection="row">
                    Latest request:
                  </Typography>
                  <Typography
                    variant="p"
                    align="right"
                    flexDirection="row-reverse"
                  >
                    {bridge.lastRequest}
                  </Typography>
                  <br />
                  <Typography variant="p">Last modified:</Typography>
                  <Typography variant="p">{bridge.updatedAt}</Typography>
                  <br />
                  <Typography variant="p">Last Number of requests:</Typography>
                  <Typography variant="p">{bridge.requests}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export async function getStaticProps(context) {
  return {
    props: {
      data: [
        {
          title: 'test title 1',
          updatedAt: Date.now(),
          lastRequest: Date.now(),
          requests: 10,
        },
        {
          title: 'test title 2',
          updatedAt: Date.now(),
          lastRequest: Date.now(),
          requests: 15,
        },
        {
          title: 'test title 3',
          updatedAt: Date.now(),
          lastRequest: Date.now(),
          requests: 20,
        },
        {
          title: 'test title 4',
          updatedAt: Date.now(),
          lastRequest: Date.now(),
          requests: 25,
        },
        {
          title: 'test title 5',
          updatedAt: Date.now(),
          lastRequest: Date.now(),
          requests: 30,
        },
      ],
    },
  };
}

export default Dashboard;
