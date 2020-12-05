import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Typography,
  Button,
  Grid,
  makeStyles,
  Dialog,
} from '@material-ui/core';
import MailIcon from '@material-ui/icons/Mail';

import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';

import SnackAlert from '../shared/SnackAlert';
import emailValidator from '../../utils/emailValidator';
import api from '../../utils/api';

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: '10px',
  },
  mailIcon: {
    color: theme.palette.secondary.main,
    fontSize: '4rem',
    justifyContent: 'center',
  },
  aside: {
    backgroundColor: theme.palette.primary.main,
    height: '100%',
  },
  title: {
    marginBottom: theme.spacing(2),
  },
}));

export default function Contact({ open, setOpen }) {
  const classes = useStyles();
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

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
    api.post('/contact', values)
      .then(() => setSuccessOpen(true))
      .catch(() => setErrorOpen(true));
  };

  const handleSnackClose = (_, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSuccessOpen(false);
    setErrorOpen(false);
  };

  return (
    <div>
      <SnackAlert
        open={successOpen}
        onClose={handleSnackClose}
        severity="success"
        message="Success! We'll be in contact with you shortly"
        id="success-message"
      />
      <SnackAlert
        open={errorOpen}
        onClose={handleSnackClose}
        severity="error"
        message="Some error has occurred. Please try again."
        id="error-message"
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classes.paper}>
          <Grid
            container
            spacing={0}
            className={classes.modal}
          >
            <Grid
              item
              sm={4}
              style={{ textAlign: 'center', paddingTop: '3rem' }}
            >
              <MailIcon className={classes.mailIcon} />

              <Typography variant="body1">
                If you’re having any issues with our service feel
                free to contact us and we’ll get back to you as soon as possible
              </Typography>
            </Grid>

            <Grid container item sm={8}>
              <Container component="main" maxWidth="md">
                <Grid container justify="center" item>
                  <Typography variant="h4" className={classes.title}>
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
                    <Form style={{ textAlign: 'center' }}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Field
                            component={TextField}
                            variant="outlined"
                            name="full_name"
                            label="Full Name"
                            value={values.full_name}
                            style={{ marginBottom: '10px', width: '100%' }}
                            required
                          />
                          <Field
                            component={TextField}
                            variant="outlined"
                            type="email"
                            label="Email"
                            name="email"
                            value={values.email}
                            style={{ marginBottom: '10px', width: '100%' }}
                            required
                          />
                          <Field
                            component={TextField}
                            variant="outlined"
                            label="Message"
                            name="message"
                            multiline
                            InputProps={{ classes: { root: classes.message } }}
                            style={{ marginBottom: '10px', width: '100%' }}
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
                      >
                        Send
                      </Button>
                    </Form>
                  )}
                </Formik>

              </Container>

            </Grid>
          </Grid>
        </div>
      </Dialog>
    </div>
  );
}

Contact.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};
