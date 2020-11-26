import React, { useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Grid,
  makeStyles,
  Link,
  Paper,
} from '@material-ui/core';
import { useRouter } from 'next/router';

import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';

import { useAuth } from '../../src/contexts/auth';
import emailValidator from '../../utils/emailValidator';
import api from '../../utils/api';
import SnackAlert from '../../components/shared/alert';

const useStyles = makeStyles((theme) => ({
  paper: {
    flex: '30em',
    flexGrow: 0,
    margin: theme.spacing(2, 'auto'),
  },
  container: {
    marginTop: theme.spacing(8),
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  title: {
    marginTop: theme.spacing(2),
    color: 'grey',
  },
  login: {
    margin: theme.spacing(3, 0, 3),
  },
}));

const handleValidate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required';
  } else if (emailValidator(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.password) {
    errors.password = 'Required';
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = 'Required';
  }
  if (values.password && values.confirmPassword && values.password !== values.confirmPassword) {
    errors.password = 'Passwords do not match';
    errors.confirmPassword = 'Passwords do not match';
  }
  return errors;
};

const initialValues = {
  email: '',
  password: '',
  confirmPassword: '',
};

function Signup() {
  const router = useRouter();
  const classes = useStyles();
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (values, setSubmitting) => {
    const res = await api.post('/user', {
      user: {
        email: values.email,
        password: values.password,
        password_confirmation: values.confirmPassword,
      },
    }).catch(() => {
      setErrorOpen(true);
    });

    if (res) {
      setSuccessOpen(true);
      if (await login(values.email, values.password)) {
        router.push('/bridge/new');
      } else {
        // Ideally we send users to `/bridge/new` but if an error occurs
        // lets at least send them to the login page.
        router.push('/users/login');
      }
    }

    setSubmitting(false);
  };

  const handleSnackClose = (_, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSuccessOpen(false);
    setErrorOpen(false);
  };

  return (
    <Grid container align="center" className={classes.container}>
      <Paper className={classes.paper}>
        <Container component="main" maxWidth="sm">
          <Typography align="left" variant="body1" className={classes.title}>
            Sign up
          </Typography>
          <Formik
            initialValues={initialValues}
            validate={(values) => handleValidate(values)}
            onSubmit={(values, { setSubmitting }) => handleSubmit(values, setSubmitting)}
            validateOnBlur={false}
            validateOnChange={false}
            id="form"
          >
            {({ values, submitForm, isSubmitting }) => (
              <Form className={classes.form}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Field
                      component={TextField}
                      variant="outlined"
                      fullWidth
                      type="email"
                      label="Email Address"
                      name="email"
                      value={values.email}
                      style={{ marginBottom: 20 }}
                      id="email-input"
                    />
                    <Field
                      component={TextField}
                      variant="outlined"
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      value={values.password}
                      style={{ marginBottom: 20 }}
                      id="password-input"
                    />
                    <Field
                      component={TextField}
                      variant="outlined"
                      fullWidth
                      name="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      value={values.confirmPassword}
                      style={{ marginBottom: 10 }}
                      id="password-confirmation-input"
                    />
                  </Grid>
                </Grid>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={submitForm}
                  disabled={isSubmitting}
                >
                  Sign Up
                </Button>
              </Form>
            )}
          </Formik>
          <Link href="/users/login">
            <Typography className={classes.login}>
              Already have an account?
            </Typography>
          </Link>
        </Container>
      </Paper>
      <SnackAlert open={successOpen} onClose={handleSnackClose} severity="success" message="Account has been created. Redirecting..." />
      <SnackAlert open={errorOpen} onClose={handleSnackClose} severity="error" message="Some error occurred. Please try again." />
    </Grid>
  );
}

export default Signup;
