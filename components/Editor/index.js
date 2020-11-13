import {
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

import api from '../../utils/api';

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: 180,
  },
  form: {
    minWidth: '100%',
  },
  action: {
    margin: theme.spacing(0, 1),
  },
  textCenter: {
    textAlign: 'center',
  },
}));

function Editor({ bridge, isEditView }) {
  const classes = useStyles();

  const {
    id,
    outboundUrl,
    method,
    headers,
    environmentVariables,
    events,
    data,
    title,
  } = bridge;
  const retries = String(bridge.retries);
  const delay = String(bridge.delay);
  let bridgeId = id;

  const initialValues = {
    title,
    outboundUrl,
    method,
    retries,
    delay,
    headers,
    environmentVariables,
    payloadCode: data.payload,
    testPayloadCode: data.testPayload,
  };

  const generatePayload = (values) => ({
    title: values.title,
    method: values.method,
    outbound_url: values.outboundUrl,
    retries: values.retries,
    delay: values.delay,
    headers_attributes: values.headers,
    environment_variables_attributes: values.environmentVariables,
    data: {
      payload: values.payloadCode,
      test_payload: values.testPayloadCode,
    },
  });

  const handleSubmit = async (values, setSubmitting) => {
    // TODO: Some visual cue that we saved.
    if (bridgeId) {
      const res = await api.patch(`/bridges/${id}`, generatePayload(values));
      console.log(res);
    } else {
      const res = await api.post('/bridges', generatePayload(values));
      bridgeId = res.data.id;
    }
  };

  return (
    <>
      <Navbar />
      <Sidebar events={events} title={title} />

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
              <Form className={classes.form}>
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
                  outboundUrl={values.outboundUrl}
                  title={values.title}
                />
                <EnvironmentVariablesCard environmentVariables={values.environmentVariables} />
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
  isEditView: false,
  bridge: {
    title: '',
    outboundUrl: '',
    method: '',
    retries: '',
    delay: '',
    headers: [
    // { key: '', value: '' },
    ],
    environmentVariables: [
    // { key: '', value: '' },
    ],
    events: [],
    data: {
      payload: '',
      testPayload: '',
    },
  },
};

Editor.propTypes = {
  isEditView: PropTypes.bool,
  bridge: PropTypes.shape({
    title: PropTypes.string,
    outboundUrl: PropTypes.string,
    method: PropTypes.string,
    retries: PropTypes.number,
    delay: PropTypes.number,
    headers: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string,
        value: PropTypes.string,
      }),
    ),
    environmentVariables: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string,
        value: PropTypes.string,
      }),
    ),
    events: PropTypes.array,
    data: PropTypes.shape({
      payload: PropTypes.string,
      testPayload: PropTypes.string,
    }),
  }),
};
