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

function MethodDropdown() {
  const classes = useStyles();
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
      >
        {retries.map((retry) => (
          <MenuItem key={`${retry}-retries`} value={retry}>{`${retry} Retries`}</MenuItem>
        ))}
      </Field>
    </FormControl>
  );
}

export default MethodDropdown;
