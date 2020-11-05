import {
  Container,
  Typography,
  Button,
  makeStyles,
  Grid,
} from '@material-ui/core';
import PropTypes from 'prop-types';

import { Formik, Form } from 'formik';

import Navbar from '../shared/dashboard/Navbar';
import Sidebar from '../Sidebar';

import BridgeTestCard from './BridgeTestCard';
import PayloadCard from './PayloadCard';
import EnvironmentVariablesCard from './EnvironmentVariablesCard';
import HeadersCard from './HeadersCard';

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
    marginLeft: 180,
  },
  action: {
    margin: theme.spacing(0, 1),
  },
  textCenter: {
    textAlign: 'center',
  },
}));

function Editor({
  outboundURL, method, retries, delay, headers, envVars, isEditView, events,
}) {
  const classes = useStyles();

  const initialValues = {
    outboundURL,
    method,
    retries,
    delay,
    headers,
    envVars,
    payloadCode: '',
    testPayloadCode: '',
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
      <Sidebar events={events} title="Untitled" />

      <Grid container item spacing={5} className={classes.root} sm={9} md={10}>

        <Grid item container wrap="nowrap">
          <Formik
            initialValues={initialValues}
            onSubmit={(values, { setSubmitting }) => handleSubmit(values, setSubmitting)}
            validateOnChange={false}
            validateOnBlur={false}
            className={classes.root}
          >
            {({ values, submitForm }) => (
              <Form>
                <Grid container>
                  <Grid item sm={8} md={8} lg={8} container justify="flex-end">
                    <Grid>
                      <Typography variant="subtitle2" className={classes.textCenter}>Send your events here</Typography>
                      <Typography variant="h6">https://bridgeapi.dev/b13923/inbound</Typography>
                    </Grid>
                  </Grid>
                  <Grid item sm={4} md={4} lg={4} container justify="flex-end">
                    <Grid>
                      <Button variant="outlined" color="secondary" className={classes.action}>Actions</Button>
                      <Button onClick={submitForm} variant="contained" color="secondary">Save</Button>
                    </Grid>
                  </Grid>
                </Grid>

                <HeadersCard
                  headers={values.headers}
                  outboundURL={values.outboundURL}
                />
                <EnvironmentVariablesCard envVars={values.envVars} />
                <PayloadCard
                  isEditView={isEditView}
                  values={values}
                />
                <BridgeTestCard
                  isEditView={isEditView}
                  values={values}
                />

              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </>
  );
}

export default Editor;

Editor.defaultProps = {
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
  isEditView: false,
  events: [],
};

Editor.propTypes = {
  outboundURL: PropTypes.string,
  method: PropTypes.string,
  retries: PropTypes.string,
  delay: PropTypes.string,
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      value: PropTypes.string,
    }),
  ),
  envVars: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      value: PropTypes.string,
    }),
  ),
  isEditView: PropTypes.bool,
  events: PropTypes.array,
};
