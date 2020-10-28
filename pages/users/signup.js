import { Formik, Field, Form } from 'formik';
import { TextField } from 'formik-material-ui';
import {
  Button,
  Grid,
  Link,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles({
  '@global': {
    body: {
      backgroundColor: 'F5F8FB',
    },
  },
  root: {
    margin: 'auto',
    maxWidth: '70%',
  },
  paper: {
    maxWidth: '50%',
    margin: 'auto',
  },
  form: {},
  field: {},
});

function Signup() {
  const classes = useStyles();
  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
          confirmPassword: '',
        }}
        validate={(values) => {
          const errors = [];
          if (!values.email) {
            errors.email = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }
          if (!values.password) {
            errors.password = 'Required';
          }
          if (!values.confirmPassword) {
            errors.confirmPassword = 'Required';
          }
          if (values.password !== values.confirmPassword) {
            errors.passWordsMismatch =
              'Password does not match "Confirm Password"';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
          // TODO: axios request
          setTimeout(() => {
            setSubmitting(false);
          }, 500);
        }}
      >
        {({ submitForm, isSubmitting }) => (
          <Paper
            style={{
              maxWidth: '50%',
              margin: 'auto',
              marginTop: '10%',
            }}
          >
            <Typography style={{ marginLeft: 15, marginTop: 15 }}>
              Sign Up
            </Typography>
            <Form className={classes.root}>
              <Grid
                container
                direction="column"
                alignItems="center"
                spacing={1}
                style={{ marginTop: 50 }}
              >
                <Grid item>
                  <Field
                    component={TextField}
                    name="email"
                    type="email"
                    label="Email"
                    className={classes.field}
                    variant="outlined"
                  />
                </Grid>
                <br />
                <Grid item>
                  <Field
                    component={TextField}
                    name="password"
                    type="password"
                    label="Password"
                    className={classes.field}
                    variant="outlined"
                  />
                </Grid>
                <br />
                <Grid item>
                  <Field
                    component={TextField}
                    name="confirmPassword"
                    type="password"
                    label="Confirm Password"
                    className={classes.field}
                    variant="outlined"
                  />
                </Grid>
                <br />

                <Grid item xs={6}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    onClick={submitForm}
                    fullWidth
                  >
                    <Typography>SIGN UP</Typography>
                  </Button>
                </Grid>

                <br />
                <Grid item>
                  <Link href="users/login">
                    <a>
                      <Typography>Already have an account?</Typography>
                    </a>
                  </Link>
                </Grid>
              </Grid>
            </Form>
          </Paper>
        )}
      </Formik>
    </>
  );
}

export default Signup;
