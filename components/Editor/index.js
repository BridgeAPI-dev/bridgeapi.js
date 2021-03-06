import React, { useState } from 'react';
import {
  Typography,
  Button,
  makeStyles,
  Grid,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import { useRouter } from 'next/router';

import Navbar from '../shared/dashboard/Navbar';
import Sidebar from '../Sidebar';

import BridgeTestCard from './BridgeTestCard';
import PayloadCard from './PayloadCard';
import EnvironmentVariablesCard from './EnvironmentVariablesCard';
import HeadersCard from './HeadersCard';
import ActionsDialog from './ActionsDialog';

import api from '../../utils/api';
import SnackAlert from '../shared/SnackAlert';

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
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [actionsDialogOpen, setActionsDialogOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('Some error has occurred. Please try again.');
  const [testAlertOpen, setTestAlertOpen] = useState(false);

  // TODO: Custom error messages
  // const [errMsg, setErrMsg] = useState('');

  const {
    active,
    slug,
    outboundUrl,
    httpMethod,
    headers,
    environmentVariables,
    data,
    title,
  } = bridge;
  const retries = String(bridge.retries);
  const delay = String(bridge.delay);

  const initialValues = {
    active,
    title,
    outboundUrl,
    httpMethod,
    retries,
    delay,
    headers,
    environmentVariables,
    // The code editors will set these vars in it's useEffect hook.
    // However, if a user types faster than the useEffect loads,
    // these won't be set thus backend validation will fail.
    payloadCode:
      data.payload
      || '{\n'
        + '  "hello": "world",\n'
        + '  "accessPayload": "$payload.message",\n'
        + '  "accessNestedPayload": "$payload.nested.message"\n'
        + '}',
    testPayloadCode:
      data.testPayload
      || '{\n'
        + '  "hello": "world",\n'
        + '  "message": "Hello World",\n'
        + '  "nested": {\n'
        + '    "message": "Hello World"\n'
        + '  }\n'
        + '}',
  };

  const cleanEnvironmentVariables = (values) => values.environmentVariables.map((envVar) => {
    const cleanedEnvVar = { ...envVar };
    if (envVar.id && envVar.value === 'XXXX-XXX-XXXX') {
      delete cleanedEnvVar.value;
    }

    return cleanedEnvVar;
  });

  const generatePayload = (values) => ({
    active: values.active,
    title: values.title,
    http_method: values.httpMethod,
    outbound_url: values.outboundUrl,
    retries: values.retries,
    delay: values.delay,
    headers_attributes: values.headers,
    environment_variables_attributes: cleanEnvironmentVariables(values),
    data: {
      payload: values.payloadCode,
      test_payload: values.testPayloadCode,
    },
  });

  const validatePayloads = (payloadCode, testPayloadCode) => {
    const erraneousPayloads = [];
    const validatePayload = (payload, type) => {
      try { JSON.parse(payload); } catch { erraneousPayloads.push(type); }
    };
    const createErrorMessage = () => {
      if (erraneousPayloads.length === 1) {
        setErrorMessage(`Invalid JSON for ${erraneousPayloads[0]} editor`);
      } else {
        setErrorMessage('Invalid JSON for Payload and Test Payload editors');
      }
    };

    validatePayload(payloadCode, 'Payload');
    validatePayload(testPayloadCode, 'Test Payload');

    if (erraneousPayloads.length !== 0) {
      createErrorMessage();
      setErrorOpen(true);
      return false;
    }

    return true;
  };

  const handleSubmit = async (values, setSubmitting) => {
    if (validatePayloads(values.payloadCode, values.testPayloadCode)) {
      // POST if new bridge, otherwise PATCH
      if (slug) {
        await api
          .patch(`/bridges/${slug}`, generatePayload(values))
          .then(() => setOpen(true))
          .catch(() => setErrorOpen(true));
      } else {
        await api
          .post('/bridges', generatePayload(values))
          .then((res) => {
            setOpen(true);
            // TODO: Should timeout so user gets a chance to read the snack
            // but is 200ms the time we want?
            setTimeout(() => {
              router.push(`/bridge/${res.data.slug}`);
            }, 200);
          })
          .catch(() => setErrorOpen(true));
      }
    }

    setSubmitting(false);
  };

  const handleClose = (_, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    setErrorOpen(false);
    setTestAlertOpen(false);
  };

  return (
    <>
      <Navbar />
      <Sidebar events={bridge.events} bridgeSlug={bridge.slug} title={title} />

      <Grid container item spacing={5} className={classes.root} sm={9} md={10}>
        <Grid item container wrap="nowrap">
          <Formik
            initialValues={initialValues}
            onSubmit={(values, { setSubmitting }) => handleSubmit(values, setSubmitting)}
            validateOnChange={false}
            validateOnBlur={false}
            className={classes.root}
            id="form"
          >
            {({ values, submitForm }) => (
              <Form className={classes.form}>
                <Grid container>
                  <Grid item sm={8} md={8} lg={8} container justify="flex-end">
                    <Grid>
                      <Typography
                        variant="subtitle2"
                        className={classes.textCenter}
                      >
                        Send your events here:
                      </Typography>
                      <Typography variant="h6">
                        {slug ? `https://api.bridgeapi.dev/${slug}` : 'Autogenerated on save.'}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item sm={4} md={4} lg={4} container justify="flex-end">
                    <Grid>
                      {slug && (
                        <>
                          <ActionsDialog
                            active={active}
                            open={actionsDialogOpen}
                            onClose={() => setActionsDialogOpen(false)}
                            bridgeSlug={slug}
                          />
                          <Button
                            onClick={() => setActionsDialogOpen(true)}
                            variant="outlined"
                            color="secondary"
                            className={classes.action}
                            id="actions-button"
                          >
                            Actions
                          </Button>
                        </>
                      )}
                      <Button id="save-btn" onClick={submitForm} variant="contained" color="secondary">Save</Button>
                    </Grid>
                  </Grid>
                </Grid>

                <HeadersCard
                  headers={values.headers}
                  outboundUrl={values.outboundUrl}
                  title={values.title}
                />
                <EnvironmentVariablesCard
                  environmentVariables={values.environmentVariables}
                />
                <PayloadCard isEditView={isEditView} values={values} />
                <BridgeTestCard
                  isEditView={isEditView}
                  values={values}
                  slug={slug}
                  setOpen={setTestAlertOpen}
                  setErrorOpen={setErrorOpen}
                />
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
      <SnackAlert id="success-alert" open={open} onClose={handleClose} severity="success" message="Bridge has been saved." />
      <SnackAlert id="error-alert" open={errorOpen} onClose={handleClose} severity="error" message={errorMessage} />
      <SnackAlert
        id="bridge-test-success-alert"
        open={testAlertOpen}
        onClose={handleClose}
        severity="success"
        message="Test has been started. Please check your events in a few minutes."
      />
    </>
  );
}

export default Editor;

Editor.defaultProps = {
  isEditView: false,
  bridge: {
    active: true,
    title: '',
    outboundUrl: '',
    httpMethod: '',
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
    active: PropTypes.bool,
    slug: PropTypes.string,
    title: PropTypes.string,
    outboundUrl: PropTypes.string,
    httpMethod: PropTypes.string,
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
    events: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        completed: PropTypes.bool,
        completed_at: PropTypes.string,
        data: PropTypes.string,
        statusCode: PropTypes.number,
        test: PropTypes.bool,
      }),
    ),
    data: PropTypes.shape({
      payload: PropTypes.string,
      testPayload: PropTypes.string,
    }),
  }),
};
