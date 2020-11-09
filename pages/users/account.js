import { useState } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import {
  Button, LinearProgress, Container, Grid, Typography,
} from '@material-ui/core';
import { TextField, CheckboxWithLabel } from 'formik-material-ui';

import Navbar from '../../components/shared/dashboard/Navbar';
import DeleteAccountModal from '../../components/account/Modal';
import emailValidator from '../../utils/emailValidator';
import ProtectRoute from '../../utils/ProtectRoute';

function Account({ user }) {
  const [open, setOpen] = useState(false);

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
    return errors;
  };

  const handleSubmit = (values, setSubmitting) => {
    // eslint-disable-next-line no-console
    console.log(values);
    setTimeout(() => {
      setSubmitting(false);
      // alert(JSON.stringify(values, null, 2));
    }, 500);
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
                      style={{ marginBottom: '25px' }}
                    />

                    <Typography variant="caption" display="block" gutterBottom>
                      New Password:
                    </Typography>
                    <Field
                      component={TextField}
                      variant="outlined"
                      type="password"
                      label="Current Password"
                      name="currentPassword"
                      style={{ marginBottom: '10px' }}
                      value={values.currentPassword}
                    />
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
                      Label={{ label: 'Email notification after each bridge event' }}
                    />

                    <Typography variant="caption" display="block" gutterBottom style={{ marginTop: '25px' }}>
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
    </ProtectRoute>
  );
}

export default Account;

// eslint-disable-next-line no-unused-vars
export async function getStaticProps(context) {
  return {
    props: {
      user: {
        email: 'myemail@gmail.com',
        notifications: {
          emailOnEvents: true,
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
