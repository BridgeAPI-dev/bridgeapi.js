import {
  Container,
  Typography,
  Button,
  Grid,
  makeStyles,
  Link,
  Paper,
} from '@material-ui/core';

import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';

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
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.password) {
    errors.password = 'Required';
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = 'Required';
  }
  return errors;
};

const handleSubmit = (values, setSubmitting) => {
  console.log(values);
  // TODO: axios request
  setTimeout(() => {
    setSubmitting(false);
  }, 500);
};

const initialValues = {
  email: '',
  password: '',
  confirmPassword: '',
};

function Signup() {
  const classes = useStyles();

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
            onSubmit={(values, { setSubmitting }) =>
              handleSubmit(values, setSubmitting)
            }
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
    </Grid>
  );
}

export default Signup;
