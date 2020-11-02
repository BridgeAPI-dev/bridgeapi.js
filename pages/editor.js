import {
  Container,
  Typography,
  Button,
  makeStyles,
  Box,
} from '@material-ui/core';

import { Formik, Form } from 'formik';

import Navbar from '../components/shared/dashboard/Navbar/index';
import Tester from '../components/editor/tester';
import Payload from '../components/editor/payload';
import Envar from '../components/editor/envar';
import Headers from '../components/editor/headers';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  form: {
    marginTop: theme.spacing(2),
  },
  action: {
    margin: theme.spacing(0, 1),
  },
  buttonsContainer: {
    position: 'absolute',
    display: 'inline-block',
    right: theme.spacing(2),
  },
  dinlineblock: {
    display: 'inline-block',
  },
}));

function Editor() {
  const classes = useStyles();

  const initialValues = {
    method: "",
    retries: "",
    delay: "",
  };

  const handleValidate = () => {
    const errors = {};
    return errors;
  };

  const handleSubmit = (values) => {
    console.log(values);
    // TODO: axios request
    setTimeout(() => {
      // setSubmitting(false);
    }, 500);
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={(values) => handleValidate(values)}
      onSubmit={(values, { setSubmitting }) => handleSubmit(values, setSubmitting)}
    >
      {({ submitForm }) => (
        <Form className={classes.form}>
          <Navbar />
          <Container align="center" maxWidth={false} className={classes.root}>
            <Typography variant="subtitle2">Send your events here</Typography>
            <Typography variant="h5" className={classes.dinlineblock}>https://bridgeapi.dev/b13923/inbound</Typography>
            <Box className={classes.buttonsContainer}>
              <Button variant="outlined" color="secondary" className={classes.action}>Actions</Button>
              <Button onClick={submitForm} variant="contained" color="primary">Save</Button>
            </Box>
            <Headers />
            <Envar />
            <Payload />
            <Tester />
          </Container>
        </Form>
      )}
    </Formik>
  );
}

export default Editor;
