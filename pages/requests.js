import { Form } from 'formik';
import {
  Grid,
  makeStyles,
  List,
  ListItem,
  ListItemText,
  Typography,
  Alert,
} from '@material-ui/core';
import Navbar from '../components/shared/dashboard/Navbar/index';

const timestampObjects = [
  {
    time: '',
    date: '',
    status: '',
  },
  {
    time: '',
    date: '',
    status: '',
  },
  {
    time: '9:32 PM',
    date: '10/17/2020',
    status: 200,
  },
  {
    time: '9:34 PM',
    date: '10/17/2020',
    status: 200,
  },
  {
    time: '9:36 PM',
    date: '10/17/2020',
    status: 300,
  },
  {
    time: '9:37 PM',
    date: '10/17/2020',
    status: 302,
  },
];

const useStyles = makeStyles({
  sidebar: {},
  viewport: {},
});

const getAlert = () => {
  const { status } = this.props;
  switch (true) {
    case status <= 199:
      return (
        <Alert severity="info">
          `$
          {status} - Informational response`
        </Alert>
      );
    case status <= 299:
      return 'success';
    case status <= 399:
      return 'warning';
    default:
      return 'error';
  }
};

function Requests(props) {
  Requests.defaultProps = {
    title: 'Bridge1',
    status: 200,
  };

  const [selectedRequest, setSelectedRequest] = React.useState(0);

  const classes = useStyles();

  return (
    <>
      <Navbar />
      <Grid container spacing={0} direction="row">
        <Grid item direction="column" xs={2}>
          <List>
            {timestampObjects.map((obj) => (
              <>
                <ListItem divider>
                  <ListItemText>
                    <Typography variant="body2">
                      {!obj.time && 'Ongoing'}
                      {obj.time && `${obj.time} - ${obj.date} ${obj.status}`}
                    </Typography>
                  </ListItemText>
                </ListItem>
              </>
            ))}
          </List>
        </Grid>
        <Grid container item direction="column" xs={10}>
          {getAlert()}

          <p>column 4</p>
          <p>column 5</p>
          <p>column 6</p>
        </Grid>
      </Grid>
    </>
  );
}

export default Requests;
