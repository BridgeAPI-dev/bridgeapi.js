import {
  Container,
  Typography,
  Button,
  makeStyles,
  Grid,
} from '@material-ui/core';
import PropTypes from 'prop-types';

import { Formik, Form } from 'formik';

import Navbar from '../components/shared/dashboard/Navbar';
import BridgeTestCard from '../components/editor/BridgeTestCard';
import PayloadCard from '../components/editor/PayloadCard';
import EnvironmentVariablesCard from '../components/editor/EnvironmentVariablesCard';
import HeadersCard from '../components/editor/HeadersCard';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  action: {
    margin: theme.spacing(0, 1),
  },
  textCenter: {
    textAlign: 'center',
  },
}));

function Editor({
  outboundURL, method, retries, delay, headers, envVars,
}) {
  const classes = useStyles();

  const initialValues = {
    outboundURL,
    method,
    retries,
    delay,
    headers,
    envVars,
  };

  const handleValidate = (values) => {
    const errors = {};
    // if (!values.method) {
    //   errors.method = 'Required';
    // }
    // console.log(errors);
    return errors;
  };

  const handleSubmit = (values, setSubmitting) => {
    console.log(values);
    // TODO: axios request
    setTimeout(() => {
      setSubmitting(false);
    }, 100);
  };

  return (
    <>
      <Navbar />
      <Container maxWidth={false} className={classes.root}>
        <Formik
          initialValues={initialValues}
          validate={(values) => handleValidate(values)}
          onSubmit={(values, { setSubmitting }) => handleSubmit(values, setSubmitting)}
        >
          {({ values, submitForm }) => (
            <Form>
              <Grid container>
                <Grid item md={8} lg={8} container justify="flex-end">
                  <Grid>
                    <Typography variant="subtitle2" className={classes.textCenter}>Send your events here</Typography>
                    <Typography variant="h6">https://bridgeapi.dev/b13923/inbound</Typography>
                  </Grid>
                </Grid>
                <Grid item md={4} lg={4} container justify="flex-end">
                  <Grid>
                    <Button variant="outlined" color="secondary" className={classes.action}>Actions</Button>
                    <Button onClick={submitForm} variant="contained" color="primary">Save</Button>
                  </Grid>
                </Grid>
              </Grid>

              <HeadersCard
                headers={values.headers}
                outboundURL={values.outboundURL}
              />
              <EnvironmentVariablesCard envVars={values.envVars} />
              <PayloadCard values={values} />
              <BridgeTestCard values={values} />

            </Form>
          )}
        </Formik>
      </Container>
    </>
  );
}

export default Editor;

// eslint-disable-next-line no-unused-vars
export async function getStaticProps(context) {
  return {
    props: {
      outboundURL: '',
      method: '',
      retries: '',
      delay: '',
      headers: [
        { key: '', value: '' },
      ],
      envVars: [
        { key: '', value: '' },
      ],
    },
  };
}

Editor.propTypes = {
  outboundURL: PropTypes.string.isRequired,
  method: PropTypes.string.isRequired,
  retries: PropTypes.string.isRequired,
  delay: PropTypes.string.isRequired,
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
  envVars: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
