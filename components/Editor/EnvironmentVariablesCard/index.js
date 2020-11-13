import React from 'react';
import PropTypes from 'prop-types';
import {
  Accordion, AccordionDetails, Button, makeStyles, Grid,
} from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import { FastField, FieldArray } from 'formik';

import AccordionSummary from '../../AccordionSummary';

const useStyles = makeStyles((theme) => ({
  primary: {
    color: theme.palette.primary.main,
  },
  heading: {
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#a6a6a4',
  },
  noPadding: {
    padding: 0,
  },
  plusButton: {
    margin: theme.spacing(1),
  },
}));

const validateEnvVars = (input) => {
  let error;
  if (!input) {
    error = 'Required or Delete Row';
  }
  return error;
};

function EnvironmentVariablesCard({ environmentVariables }) {
  const classes = useStyles();

  return (
    <Accordion defaultExpanded>
      <AccordionSummary
        icon={<ExpandMoreIcon />}
        title="Environment variables"
        subtitle="Keep Your Secrets Safe"
      />
      <AccordionDetails>
        <Grid container spacing={2}>
          <FieldArray
            name="environmentVariables"
            render={(arrayHelpers) => (
              <>
                {environmentVariables.map((envVar, idx) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <React.Fragment key={`environmentVariables-${idx}`}>
                    <Grid item xs={5}>
                      <FastField
                        component={TextField}
                        variant="outlined"
                        name={`environmentVariables[${idx}].key`}
                        value={envVar.key || ''}
                        placeholder="Key"
                        id={`envVar-${idx}`}
                        fullWidth
                        validate={validateEnvVars}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FastField
                        component={TextField}
                        variant="outlined"
                        name={`environmentVariables[${idx}].value`}
                        value={envVar.value || ''}
                        placeholder="Value"
                        fullWidth
                        validate={validateEnvVars}
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
      </AccordionDetails>
    </Accordion>
  );
}

export default EnvironmentVariablesCard;

EnvironmentVariablesCard.propTypes = {
  environmentVariables: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};
