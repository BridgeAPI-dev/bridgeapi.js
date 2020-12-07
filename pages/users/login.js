// TODO: Change to snackbar
import { useState } from 'react';
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

import emailValidator from '../../utils/emailValidator';
import { useAuth } from '../../src/contexts/auth';
import SnackAlert from '../../components/shared/SnackAlert';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(10),
    flex: '30em',
    flexGrow: 0,
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

function Login() {
  const { login } = useAuth();
  const classes = useStyles();
  // TODO
  // eslint-disable-next-line no-unused-vars
  const router = useRouter();
  const [formMessage, setFormMessage] = useState('');
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);

  const initialValues = {
    email: '',
    password: '',
  };

  const handleValidate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = 'Required';
    } else if (emailValidator(values.email)) {
      errors.email = 'Invalid Email Address';
    }
    if (!values.password) {
      errors.password = 'Required';
    }
    return errors;
  };

  const handleSubmit = async (values, setSubmitting) => {
    setFormMessage('');

    if (await login(values.email, values.password)) {
      setFormMessage('Success: Logging in. Please wait.');
      // router.push('/dashboard');
      //
      // TODO: Nextjs doesn't support Server side redirects
      // with client side router pushes. If we push to dashboard,
      // then dashboards `getServerSideProps` returns 4XX, the app
      // will crash with error:
      // Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
      //
      // To remedy this, I believe it would be best to get rid of
      // the ssrRedirect protection and rely on the client side
      // protection.
      //
      // window.location causes a full refresh which solves the issue.
      window.location.pathname = '/dashboard';
    } else {
      setErrorOpen(true);
      setSubmitting(false);
    }
  };

  const handleSnackClose = (_, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSuccessOpen(false);
    setErrorOpen(false);
  };

  return (
    <Grid
      container
      spacing={0}
      align="center"
      justify="center"
    >
      <Paper className={classes.paper}>
        <Container component="main" maxWidth="sm">
          <Grid container item>
            <Typography variant="body1" className={classes.title}>
              Login
            </Typography>
          </Grid>
          <Formik
            initialValues={initialValues}
            validate={(values) => handleValidate(values)}
            onSubmit={(values, { setSubmitting }) => handleSubmit(values, setSubmitting)}
            id="form"
          >
            {({
              isSubmitting, values,
            }) => (
              <Form className={classes.form}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Field
                      component={TextField}
                      variant="outlined"
                      name="email"
                      type="email"
                      label="Email"
                      value={values.email}
                      style={{ marginBottom: '25px', width: '100%' }}
                      id="email-input"
                    />
                    <Field
                      component={TextField}
                      variant="outlined"
                      type="password"
                      label="Password"
                      name="password"
                      style={{ width: '100%' }}
                      value={values.password}
                      id="password-input"
                    />
                  </Grid>
                </Grid>

                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  disabled={isSubmitting}
                  type="submit"
                >
                  Login
                </Button>
              </Form>
            )}
          </Formik>

          {formMessage
            && (
            <Typography>
              {formMessage}
            </Typography>
            )}

          <Link href="/users/signup">
            <Typography className={classes.login}>
              Don&#39;t have an account? Sign up now!
            </Typography>
          </Link>

        </Container>
      </Paper>
      <SnackAlert open={successOpen} onClose={handleSnackClose} severity="success" message="Success: Logging in. Please wait." />
      <SnackAlert open={errorOpen} onClose={handleSnackClose} severity="error" message="Error: Email or password is invalid" />
    </Grid>
  );
}

export default Login;
