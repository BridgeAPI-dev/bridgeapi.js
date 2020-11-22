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
import SnackAlert from '../shared/alert';

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
  // TODO: Custom error messages
  // const [errMsg, setErrMsg] = useState('');

  const {
    active,
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

  const initialValues = {
    active,
    title,
    outboundUrl,
    method,
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
        + '  "acessEnvVars": "$env.MY_KEY",\n'
        + '  "accessPayload": "$payload.message"\n'
        + '}',
    testPayloadCode:
      data.testPayload
      || '{\n'
        + '  "hello": "world",\n'
        + '  "acessEnvVars": "$env.MY_KEY",\n'
        + '  "accessPayload": "$payload.message"\n'
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
    method: values.method,
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

  const handleSubmit = async (values, setSubmitting) => {
    if (id) {
      // POST if new bridge, otherwise PATCH
      await api
        .patch(`/bridges/${id}`, generatePayload(values))
        .catch(() => setErrorOpen(true));
    } else {
      await api
        .post('/bridges', generatePayload(values))
        .then((res) => router.push(`/bridge/${res.data.id}`))
        .catch(() => setErrorOpen(true));
    }

    setOpen(true);
    setSubmitting(false);
  };

  const handleClose = (_, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    setErrorOpen(false);
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
                      <Typography
                        variant="subtitle2"
                        className={classes.textCenter}
                      >
                        Send your events here
                      </Typography>
                      <Typography variant="h6">
                        https://bridgeapi.dev/b13923/inbound
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item sm={4} md={4} lg={4} container justify="flex-end">
                    <Grid>
                      <ActionsDialog
                        active={active}
                        open={actionsDialogOpen}
                        onClose={() => setActionsDialogOpen(false)}
                        id={id}
                      />
                      <Button onClick={() => setActionsDialogOpen(true)} variant="outlined" color="secondary" className={classes.action}>Actions</Button>
                      <Button onClick={submitForm} variant="contained" color="secondary">Save</Button>
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
                <BridgeTestCard isEditView={isEditView} values={values} />
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
      <SnackAlert open={open} onClose={handleClose} severity="success" message="Bridge has been saved." />
      <SnackAlert open={errorOpen} onClose={handleClose} severity="error" message="Some error has occured. Please try again." />
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
    active: PropTypes.bool,
    id: PropTypes.number,
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
    events: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        bridge_id: PropTypes.number.isRequired,
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
