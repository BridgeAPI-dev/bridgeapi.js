import { Formik, Field, Form } from 'formik';
import { TextField } from 'formik-material-ui';
import {
  Box,
  Button,
  Grid,
  Link,
  makeStyles,
  // TextField,
} from '@material-ui/core';
// import Link from 'next/link';

const useStyles = makeStyles({
  centerPage: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  horizontalCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  field: {
    width: 600,
    padding: 10,
    // marginLeft: 'auto',
    // marginRight: 'auto',
  },
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
          // TODO: axios request
          setTimeout(() => {
            setSubmitting(false);
          }, 500);
        }}
      >
        {({ submitForm, isSubmitting }) => (
          <Form className={classes.centerPage}>
            <Grid container direction="column" alignItems="center">
              <Field
                component={TextField}
                name="email"
                type="email"
                label="Email"
                className={classes.field}
                variant="outlined"
              />

              <br />
              <Field
                component={TextField}
                name="password"
                type="password"
                label="Password"
                className={classes.field}
                variant="outlined"
              />
              <br />
              <Field
                component={TextField}
                name="confirmPassword"
                type="password"
                label="Confirm Password"
                className={classes.field}
                variant="outlined"
              />
              {isSubmitting && <LinearProgress />}
              <br />
              <Button
                color="primary"
                disabled={isSubmitting}
                onClick={submitForm}
                className={classes.horizontalCenter}
              >
                SIGN UP
              </Button>
              <br />
              <Link href="users/login">
                <a>Already have an account?</a>
              </Link>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default Signup;
