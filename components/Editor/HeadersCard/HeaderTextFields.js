import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  makeStyles,
  Grid,
} from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { Field, FieldArray, FastField } from 'formik';

import api from '../../../utils/api';

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

  const handleDelete = async (arrayHelpers, header, idx) => {
    if (header.id) {
      arrayHelpers.remove(idx);
      await api.delete(`/headers/${header.id}`)
        .catch(() => arrayHelpers.push(header));
    } else {
      arrayHelpers.remove(idx);
    }
  };

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
              // Formik requires a key that will never change
              // eslint-disable-next-line react/no-array-index-key
              <React.Fragment key={`header-${idx}`}>
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
                    id={`headers-${idx}-value`}
                    validate={validateHeaders}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={1}>
                  <Button
                    className={classes.primary}
                    onClick={() => { handleDelete(arrayHelpers, header, idx); }}
                    id={`headers-trash-${idx}`}
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
              id="headerPlusBtn"
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

HeaderTextFields.propTypes = {
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      key: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
