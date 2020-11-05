import React from 'react';
import {
  makeStyles,
  FormControl,
  MenuItem,
} from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { Field } from 'formik';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  dropDown: {
    marginBottom: theme.spacing(1),
  },
}));

const delays = [
  '0',
  '15',
  '30',
  '60',
  '1440',
];

const validateDelay = (input) => {
  let error;
  if (!input) {
    error = 'Required';
  } else if (!delays.includes(input)) {
    error = 'Nice Try But No.';
  }
  return error;
};

function MethodDropdown() {
  const classes = useStyles();

  return (
    <FormControl className={classes.root}>
      <Field
        component={TextField}
        type="text"
        label="Delay"
        name="delay"
        select
        validate={validateDelay}
        className={classes.dropDown}
      >
        <MenuItem value="0">Instant</MenuItem>
        <MenuItem value="15">15 Minutes</MenuItem>
        <MenuItem value="30">30 Minutes</MenuItem>
        <MenuItem value="60">1 Hour</MenuItem>
        <MenuItem value="1440">1 Day</MenuItem>
      </Field>
    </FormControl>
  );
}

export default MethodDropdown;
