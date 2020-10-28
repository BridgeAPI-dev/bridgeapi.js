import {
  Container,
  Typography,
  CssBaseline,
  Button,
  Grid,
  makeStyles,
  TextField,
  Link,
  Paper,
} from '@material-ui/core';

import { Formik, Form } from 'formik';

const useStyles = makeStyles((theme) => ({
  '@global': {
    body: {
      backgroundColor: '#F5F8FB',
    },
  },
  paper: {
    width: '40%',
    margin: theme.spacing(2, 'auto'),
  },
  container: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
  const errors = [];
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
  if (values.password !== values.confirmPassword) {
    errors.passWordsMismatch = 'Password does not match "Confirm Password"';
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

function Signup() {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <div className={classes.container}>
          <Grid container>
            <Grid item>
              <Typography variant="body1" className={classes.title}>
                Sign up
              </Typography>
            </Grid>
          </Grid>
          <Formik
            initialValues={{
              email: '',
              password: '',
              confirm: '',
            }}
            validate={(values) => handleValidate(values)}
            onSubmit={(values, { setSubmitting }) =>
              handleSubmit(values, setSubmitting)
            }
          >
            {({ errors, handleChange, touched, submitForm, isSubmitting }) => (
              <Form className={classes.form}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      error={errors.email && touched.email}
                      variant="outlined"
                      fullWidth
                      onChange={handleChange}
                      id="email"
                      label="Email Address"
                      name="email"
                      helperText={
                        errors.email && touched.email ? errors.email : null
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      error={errors.password && touched.password}
                      variant="outlined"
                      fullWidth
                      onChange={handleChange}
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      helperText={
                        errors.password && touched.password
                          ? errors.password
                          : null
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      error={errors.password && touched.password}
                      variant="outlined"
                      fullWidth
                      onChange={handleChange}
                      name="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      id="confirmPassword"
                      helperText={
                        errors.confirmPassword && touched.confirmPassword
                          ? errors.confirmPassword
                          : null
                      }
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
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
          <Link href="users/login">
            <Typography className={classes.login}>
              Already have an account?
            </Typography>
          </Link>
        </div>
      </Container>
    </Paper>
  );
}

export default Signup;
