import { useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Grid,
  makeStyles,
  Paper,
} from '@material-ui/core';
import MailIcon from '@material-ui/icons/Mail';

import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import emailValidator from '../utils/emailValidator';
import api from '../utils/api';

const useStyles = makeStyles((theme) => ({
  aside: {
    backgroundColor: theme.palette.primary.main,
    height: '100%',
  },
  root: {
    marginTop: theme.spacing(10),
  },
  mailIcon: {
    color: theme.palette.secondary.main,
    fontSize: '12rem',
  },
  message: {
    height: '10rem',
    alignItems: 'baseline',
  },
  paper: {
    flex: '40em',
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
    color: theme.palette.secondary.main,
    fontWeight: 'bold',
  },
  login: {
    margin: theme.spacing(3, 0, 3),
  },
}));

function ContactUs() {
  const classes = useStyles();
  const [formMessage, setFormMessage] = useState('');

  const initialValues = {
    full_name: '',
    email: '',
    message: '',
  };

  const handleValidate = (values) => {
    const errors = {};
    if (!values.full_name) {
      errors.full_name = 'Required';
    }

    if (!values.email) {
      errors.email = 'Required';
    } else if (emailValidator(values.email)) {
      errors.email = 'Invalid Email Address';
    }

    if (!values.message) {
      errors.message = 'Required';
    }
    return errors;
  };

  const handleSubmit = async (values) => {
    console.log(values);
    api.post('/contact_us', values).then( res => {
      setFormMessage('Success! We\'ll be in contact with you shortly');
    });
  };

  return (
    <Grid
      container
      spacing={0}
      align="center"
      justify="center"
      className={classes.root}
    >
      <Grid item sm={3}>
        <Container className={classes.aside}>
          <MailIcon className={classes.mailIcon} />
          <Typography variant="h6" style={{ color: 'white' }}>If you’re having any issues with our service feel free to contact us and we’ll get back to you as soon as possible</Typography>
        </Container>
      </Grid>
      <Grid item>
        <Paper className={classes.paper}>
          <Container component="main" maxWidth="md">
            <Grid container justify="center" item>
              <Typography variant="body1" className={classes.title}>
                Contact Us
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
                        name="full_name"
                        label="Full Name"
                        value={values.full_name}
                        style={{ marginBottom: '25px', width: '100%' }}
                        required
                      />
                      <Field
                        component={TextField}
                        variant="outlined"
                        type="email"
                        label="Email"
                        name="email"
                        value={values.email}
                        style={{ marginBottom: '25px', width: '100%' }}
                        required
                      />
                      <Field
                        component={TextField}
                        variant="outlined"
                        label="Message"
                        name="message"
                        multiline
                        InputProps={{ classes: { root: classes.message } }}
                        style={{ width: '100%' }}
                        value={values.message}
                        required
                      />
                    </Grid>
                  </Grid>

                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.submit}
                    onClick={submitForm}
                    disabled={isSubmitting}
                    style={{ marginBottom: '25px', width: '10rem' }}
                  >
                    Send
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
          </Container>

        </Paper>
      </Grid>
    </Grid>
  );
}

export default ContactUs;
