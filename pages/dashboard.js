import {
  Grid,
  Paper,
  makeStyles,
  Typography,
  Divider,
} from '@material-ui/core';
import Navbar from '../components/shared/dashboard/navbar';

const useStyles = makeStyles(() => {});
function Dashboard(props) {
  const classes = useStyles();
  return (
    <>
      <Navbar />
      <Grid container className={classes.root} spacing={4}>
        {props.data.map((bridge) => (
          <Grid key={bridge} item xs={3}>
            <Paper className={classes.paper}>
              <Typography variant="h2">{bridge.title}</Typography>
              <Divider />
              <Grid container>
                <Typography variant="body1">Latest request:</Typography>
                <div className="flex" />
                <Typography variant="body1">{bridge.lastRequest}</Typography>
              </Grid>
              <Grid container>
                <Typography variant="body1">Last modified:</Typography>
                <div className="flex" />
                <Typography variant="body1">{bridge.updatedAt}</Typography>
                <br />
              </Grid>
              <Grid container>
                <Typography variant="body1">
                  Last Number of requests:
                </Typography>
                <div className="flex" />
                <Typography variant="body1">{bridge.requests}</Typography>
              </Grid>
            </Paper>
          </Grid>
        ))}
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
