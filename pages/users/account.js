import { useState } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import {
  Button,
  LinearProgress,
  Container,
  Grid,
  Typography,
} from '@material-ui/core';
import { TextField, CheckboxWithLabel } from 'formik-material-ui';

import Navbar from '../../components/shared/dashboard/Navbar';
import DeleteAccountModal from '../../components/Account/Modal';
import emailValidator from '../../utils/emailValidator';
import ProtectRoute from '../../utils/ProtectRoute';

import api from '../../utils/api';
import fetchDataOrRedirect from '../../utils/ssrRedirect';
import SnackAlert from '../../components/shared/SnackAlert';

function Account({ user }) {
  const [open, setOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleValidate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = 'Required';
    } else if (emailValidator(values.email)) {
      errors.email = 'Invalid email address';
    }

    if (!values.currentPassword) {
      errors.currentPassword = 'Required';
    }

    if (values.newPassword || values.confirmPassword) {
      if (values.newPassword !== values.confirmPassword) {
        errors.newPassword = 'Passwords do not match';
        errors.confirmPassword = 'Passwords do not match';
      }
    }
    return errors;
  };

  const handleSubmit = async (values, setSubmitting) => {
    const data = {
      current_password: values.currentPassword,
      user: {
        email: values.email,
        notifications: values.emailOnEvents,
      },
    };
    if (values.newPassword) {
      data.user.password = values.newPassword;
      data.user.password_confirmation = values.confirmPassword;
    }
    await api
      .patch('/user', data)
      .then(() => setSuccessOpen(true))
      .catch(() => setErrorOpen(true));
    setSubmitting(false);
  };

  const handleSnackClose = (_, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSuccessOpen(false);
    setErrorOpen(false);
  };

  const initialValues = {
    email: user.email,
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    emailOnEvents: user.notifications.emailOnEvents,
  };

  const handleReset = (resetForm) => {
    // eslint-disable-next-line no-alert
    if (window.confirm('Reset?')) {
      resetForm();
    }
  };

  return (
    <ProtectRoute>
      <Navbar />
      <DeleteAccountModal open={open} setOpen={setOpen} />

      <Formik
        initialValues={initialValues}
        validate={(values) => handleValidate(values)}
        onSubmit={(values, { setSubmitting }) => handleSubmit(values, setSubmitting)}
      >
        {({
          values, submitForm, isSubmitting, resetForm,
        }) => (
          <Form>
            {isSubmitting && <LinearProgress />}
            <Container maxWidth="lg">
              <Grid container spacing={3}>
                <Grid item container md={8} lg={8} direction="column">
                  <Grid item container md={4} lg={4} direction="column">
                    <Typography variant="caption" display="block" gutterBottom>
                      New Email:
                    </Typography>
                    <Field
                      component={TextField}
                      variant="outlined"
                      name="email"
                      type="email"
                      label="Email"
                      value={values.email}
                      style={{ marginBottom: '10px' }}
                    />

                    <Field
                      component={TextField}
                      variant="outlined"
                      type="password"
                      label="Current Password"
                      name="currentPassword"
                      style={{ marginBottom: '10px' }}
                      value={values.currentPassword}
                    />
                    <Typography variant="caption" display="block" gutterBottom>
                      New Password:
                    </Typography>
                    <Field
                      component={TextField}
                      variant="outlined"
                      type="password"
                      label="New Password"
                      name="newPassword"
                      value={values.newPassword}
                      style={{ marginBottom: '10px' }}
                    />
                    <Field
                      component={TextField}
                      variant="outlined"
                      type="password"
                      label="Confirm Password"
                      name="confirmPassword"
                      value={values.confirmPassword}
                      style={{ marginBottom: '25px' }}
                    />

                    <Typography variant="caption" display="block" gutterBottom>
                      Notifications:
                    </Typography>
                    <Field
                      component={CheckboxWithLabel}
                      type="checkbox"
                      color="primary"
                      name="emailOnEvents"
                      Label={{
                        label: 'Email notification after each bridge event',
                      }}
                    />

                    <Typography
                      variant="caption"
                      display="block"
                      gutterBottom
                      style={{ marginTop: '25px' }}
                    >
                      Delete Account:
                    </Typography>
                    <Button
                      variant="contained"
                      onClick={handleOpen}
                      style={{ backgroundColor: '#f32013', color: 'white' }}
                    >
                      Delete Account
                    </Button>
                  </Grid>
                </Grid>
                <Grid item container md={4} lg={4} direction="column">
                  <Grid item container justify="flex-end">
                    <Button
                      variant="outlined"
                      color="secondary"
                      disabled={isSubmitting}
                      onClick={() => handleReset(resetForm)}
                      style={{ marginRight: '10px' }}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={isSubmitting}
                      onClick={submitForm}
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Container>
          </Form>
        )}
      </Formik>
      <SnackAlert open={successOpen} onClose={handleSnackClose} severity="success" message="Account info has been updated." />
      <SnackAlert open={errorOpen} onClose={handleSnackClose} severity="error" message="Some error occurred. Please try again later." />
    </ProtectRoute>
  );
}

export default Account;

export async function getServerSideProps(context) {
  const res = await fetchDataOrRedirect(context, '/user');
  if (!res) return { props: {} }; // Redirecting to /user/login

  return {
    props: {
      user: {
        email: res.data.user.email,
        notifications: {
          emailOnEvents: res.data.user.notifications,
        },
      },
    },
  };
}

Account.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
    notifications: PropTypes.shape({
      emailOnEvents: PropTypes.bool.isRequired,
    }).isRequired,
  }).isRequired,
};
