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

import emailValidator from '../../utils/emailValidator';

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
  const classes = useStyles();

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

  const handleSubmit = (values, setSubmitting) => {
    console.log(values);
    // TODO: axios request
    setTimeout(() => {
      setSubmitting(false);
    }, 500);
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
          >
            {({
              submitForm, isSubmitting, values,
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
                    />
                    <Field
                      component={TextField}
                      variant="outlined"
                      type="password"
                      label="Password"
                      name="password"
                      style={{ width: '100%' }}
                      value={values.password}
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
                  Login
                </Button>
              </Form>
            )}
          </Formik>

          <Link href="/users/signup">
            <Typography className={classes.login}>
              Don&#39;t have an account? Sign up now!
            </Typography>
          </Link>

        </Container>
      </Paper>
    </Grid>
  );
}

export default Login;
