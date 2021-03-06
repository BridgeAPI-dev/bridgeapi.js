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
import DeleteAccountModal from '../../components/Account/ActionsDialog';
import ResetAlert from '../../components/Account/ResetAlert';
import emailValidator from '../../utils/emailValidator';
import ProtectRoute from '../../utils/ProtectRoute';

import api, { fetchSSRData } from '../../utils/api';
import SnackAlert from '../../components/shared/SnackAlert';

function Account({ user }) {
  const [open, setOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [resetAlertOpen, setResetAlertOpen] = useState(false);
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

  return (
    <ProtectRoute>
      <Navbar />
      <DeleteAccountModal open={open} onClose={() => setOpen(false)} id="delete-account-modal" />
      <Formik
        initialValues={initialValues}
        validate={(values) => handleValidate(values)}
        onSubmit={(values, { setSubmitting }) => handleSubmit(values, setSubmitting)}
        id="form"
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
                      id="email-input"
                    />

                    <Field
                      component={TextField}
                      variant="outlined"
                      type="password"
                      label="Current Password"
                      name="currentPassword"
                      style={{ marginBottom: '10px' }}
                      value={values.currentPassword}
                      id="password-input"
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
                      id="new-password-input"
                    />
                    <Field
                      component={TextField}
                      variant="outlined"
                      type="password"
                      label="Confirm Password"
                      name="confirmPassword"
                      value={values.confirmPassword}
                      style={{ marginBottom: '25px' }}
                      id="new-password-confirmation-input"
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
                      id="notifications-checkbox"
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
                      id="open-modal-button"
                    >
                      Delete Account
                    </Button>
                  </Grid>
                </Grid>
                <Grid item container md={4} lg={4} direction="column">
                  <Grid item container justify="flex-end">
                    <ResetAlert
                      open={resetAlertOpen}
                      handleClose={() => setResetAlertOpen(false)}
                      resetForm={resetForm}
                    />
                    <Button
                      variant="outlined"
                      color="secondary"
                      disabled={isSubmitting}
                      onClick={() => setResetAlertOpen(true)}
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
      <SnackAlert
        open={successOpen}
        onClose={handleSnackClose}
        severity="success"
        message="Account info has been updated."
        id="success-message"
      />
      <SnackAlert
        open={errorOpen}
        onClose={handleSnackClose}
        severity="error"
        message="Some error occurred. Please try again later."
        id="error-message"
      />
    </ProtectRoute>
  );
}

export default Account;

export async function getServerSideProps(context) {
  const res = await fetchSSRData(context, '/user');
  if (!res) {
    // Required otherwise Account#initialValues will throw an error
    return {
      props: {
        user: {
          notifications: {},
        },
      },
    };
  } // Redirecting to /user/login

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
