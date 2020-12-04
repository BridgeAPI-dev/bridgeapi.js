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

const methods = [
  'DELETE',
  'GET',
  'PATCH',
  'POST',
  'PUT',
];

const validateMethod = (input) => {
  let error;
  if (!input) {
    error = 'Required';
  } else if (!methods.includes(input)) {
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
        name="httpMethod"
        select
        validate={validateMethod}
        label="Method"
        className={classes.dropDown}
        id="method"
      >
        {methods.map((method) => (
          <MenuItem key={method} value={method}>{method}</MenuItem>
        ))}
      </Field>
    </FormControl>
  );
}

export default MethodDropdown;
