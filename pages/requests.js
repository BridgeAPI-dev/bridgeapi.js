<<<<<<< HEAD
import {
  Box,
  Card,
  Grid,
  Divider,
  makeStyles,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from '@material-ui/core';
import { CheckCircle, RemoveCircle } from '@material-ui/icons';
import Navbar from '../components/shared/dashboard/Navbar/index';
// import { Alert, TimelineDot } from '@material-ui/lab'

const requestItems = [
  {
    time: '',
    date: '',
    statusCode: '',
  },
  {
    time: '',
    date: '',
    statusCode: '',
  },
  {
    time: '9:32 PM',
    date: '10/17/2020',
    statusCode: 200,
  },
];

const randomRequestItem = {
  time: '9:37 PM',
  date: '10/17/2020',
  statusCode: 302,
};

const fillRequestItems = () => {
  for (let i = 0; i < 20; i += 1) {
    requestItems.push(randomRequestItem);
  }
};
fillRequestItems();

const useStyles = makeStyles({
  timeline: {
    marginRight: '2em',
  },
  cardTitle: {
    fontWeight: 900,
    fontSize: '1.3em',
    marginLeft: '-1em',
  },
  microCopy: {
    fontWeight: 100,
    fontSize: '0.85em',
    marginLeft: '-1.5em',
    paddingBottom: '0.5em',
  },
  // sidebar: {},
  // viewport: {},
});

// TODO: Implement when @materialui/lab is added to repo
const getAlert = () => {
  const { status } = this.props;
  switch (true) {
    case status <= 199:
      return (
        <Alert severity="info">
          `$
          {status} - Information response`
        </Alert>
      );
    case status <= 299:
      return (
        <Alert severity="success">
          `$
          {status} - Successful response`
        </Alert>
      );
    case status <= 399:
      return (
        <Alert severity="warning">
          `$
          {status} - Redirection`
        </Alert>
      );
    default:
      return (
        <Alert severity="error">
          `$
          {status} - Error response`
        </Alert>
      );
  }
};

function Requests(props) {
  const [selectedRequest, setSelectedRequest] = React.useState(0);

  const classes = useStyles();

  return (
    <>
      <Navbar />
      <Grid container spacing={6} direction="row">
        <Grid item direction="column" xs={2} style={{ 'overflow-y': 'scroll' }}>
          <List>
            {requestItems.map((obj) => (
              <>
                <ListItem divider>
                  <ListItemText>
                    <Typography
                      variant="body2"
                      align={obj.time ? 'right' : 'center'}
                    >
                      {!obj.time && 'Ongoing'}
                      {obj.time &&
                        `${obj.time} - ${obj.date} ${obj.statusCode}`}
                    </Typography>
                  </ListItemText>
                </ListItem>
              </>
            ))}
          </List>
        </Grid>
        <Grid container item direction="column" xs={10}>
          <Card
            style={{
              padding: '1em',
              color: '#1E4620',
              backgroundColor: '#EDF7ED',
            }}
          >
            <Grid container item direction="row">
              {/* TODO: Replace with Alert component */}
              <CheckCircle style={{ marginRight: '1em' }} />
              <Typography>200 OK - The latest request has succeeded</Typography>
            </Grid>
          </Card>
          <Typography align="center" variant="body2">
            Send your events here:
          </Typography>
          <Typography
            align="center"
            variant="h6"
            style={{ fontWeight: 'bold', marginBottom: '1em' }}
          >
            {props.url}
          </Typography>
          <Grid container item direction="row">
            <Typography xs={2} className={classes.timeline}>
              5:32PM
            </Typography>
            <Grid xs={10} container item direction="column">
              <Paper style={{ paddingLeft: '2em' }}>
                <Grid container item direction="row" justify="space-between">
                  <Grid item direction="column">
                    <Typography className={classes.cardTitle}>
                      Response
                    </Typography>
                    <Typography className={classes.microCopy}>
                      Response from the outbound service
                    </Typography>
                  </Grid>
                  <RemoveCircle
                    style={{ marginTop: '0.5em', marginRight: '0.5em' }}
                  />
                </Grid>
                <Divider />
                <Typography
                  align="center"
                  variant="body1"
                  style={{ fontWeight: 600, marginBottom: '1em' }}
                >
                  Status: {props.status} Time: {props.time} ms Size:{' '}
                  {props.size} KB
                </Typography>
                <Typography>HEADERS:</Typography>
                <Typography>Data: {props.date}</Typography>
                <Typography>Content-Type: {props.date}</Typography>
                <Typography>Content-Length: {props.length}</Typography>
                <Typography style={{ marginTop: '1em', marginBottom: '1em' }}>
                  PAYLOAD:
                </Typography>
                <Box>(Code editor)</Box>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

Requests.defaultProps = {
  title: 'Bridge1',
  status: 200,
  url: 'https://bridgeapi.dev/event/8726933',
  time: 796,
  size: 1.17,
  date: '17-10-2013',
  length: 6615,
};

=======
function Requests() {
  return <h1>Requests</h1>;
}

>>>>>>> 8de29e8b1c32095ec4af6d89713dd2d9e4346103
export default Requests;
