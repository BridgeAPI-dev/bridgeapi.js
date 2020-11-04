import React from 'react';
import {
  Button,
  makeStyles,
  Grid,
} from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { Field, FieldArray, FastField } from 'formik';

const useStyles = makeStyles((theme) => ({
  primary: {
    color: theme.palette.primary.main,
  },
  plusButton: {
    margin: theme.spacing(1),
  },
}));

const validateHeaders = (input) => {
  let error;
  if (!input) {
    error = 'Required or Delete Row';
  }
  return error;
};

function HeaderTextFields({ headers }) {
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      <Grid item xs={5}>
        <Field
          component={TextField}
          variant="outlined"
          name="contentType"
          placeholder="Content-Type"
          fullWidth
          disabled
        />
      </Grid>
      <Grid item xs={6}>
        <Field
          component={TextField}
          variant="outlined"
          name="json"
          placeholder="application/json"
          fullWidth
          disabled
        />
      </Grid>
      <FieldArray
        name="headers"
        render={(arrayHelpers) => (
          <>
            {headers.map((header, idx) => (
              <React.Fragment key={idx}>
                <Grid item xs={5}>
                  <FastField
                    component={TextField}
                    variant="outlined"
                    name={`headers[${idx}].key`}
                    value={header.key || ''}
                    placeholder="Key"
                    id={`headers-${idx}`}
                    validate={validateHeaders}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <FastField
                    component={TextField}
                    variant="outlined"
                    name={`headers[${idx}].value`}
                    value={header.value || ''}
                    placeholder="Value"
                    validate={validateHeaders}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={1}>
                  <Button
                    className={classes.primary}
                    onClick={() => { arrayHelpers.remove(idx); }}
                  >
                    <DeleteForeverIcon fontSize="large" />
                  </Button>
                </Grid>
              </React.Fragment>
            ))}
            <Button
              type="button"
              color="primary"
              variant="outlined"
              className={classes.plusButton}
              onClick={() => arrayHelpers.push({ key: '', value: '' })}
            >
              +
            </Button>
          </>
        )}
      />
    </Grid>
  );
}

export default HeaderTextFields;
