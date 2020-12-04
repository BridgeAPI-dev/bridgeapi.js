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

const retries = [
  '0',
  '1',
  '3',
  '5',
];

const validateRetries = (input) => {
  let error;
  if (!input) {
    error = 'Required';
  } else if (!retries.includes(input)) {
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
        label="Retries"
        name="retries"
        select
        validate={validateRetries}
        className={classes.dropDown}
        id="retries"
      >
        {retries.map((retry) => (
          <MenuItem key={`${retry}`} value={retry}>{`${retry}`}</MenuItem>
        ))}
      </Field>
    </FormControl>
  );
}

export default MethodDropdown;
