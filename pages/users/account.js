import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import {
  Button, LinearProgress, Container, Grid, Typography,
} from '@material-ui/core';
import { TextField, CheckboxWithLabel } from 'formik-material-ui';

import Navbar from '../../components/shared/dashboard/Navbar';
import DeleteAccountModal from '../../components/account/Modal';

function Account({ user }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleValidate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = 'Required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email address';
    }
    return errors;
  };

  const handleSubmit = (values, setSubmitting) => {
    console.log(values);
    setTimeout(() => {
      setSubmitting(false);
      // alert(JSON.stringify(values, null, 2));
    }, 500);
  };

  const values = {
    email: user.email,
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    emailOnEvents: user.notifications.emailOnEvents,
  };

  const handleReset = (resetForm) => {
    if (window.confirm('Reset?')) {
      resetForm();
    }
  };

  return (
    <>
      <Navbar title="Profile" />
      <DeleteAccountModal open={open} setOpen={setOpen} />
      <Container maxWidth="lg">
        <Formik
          initialValues={values}
          validate={(values) => handleValidate(values)}
          onSubmit={(values, { setSubmitting }) => handleSubmit(values, setSubmitting)}
        >
          {({
            values, submitForm, isSubmitting, resetForm,
          }) => (
            <Form>
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
                      color="secondary"
                      onClick={handleOpen}
                    >
                      Delete Account
                    </Button>
                    {isSubmitting && <LinearProgress />}
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
            </Form>
          )}
        </Formik>

      </Container>
    </>
  );
}

export default Account;

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
