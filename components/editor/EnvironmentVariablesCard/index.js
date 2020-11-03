import React from 'react';
import {
  Accordion, AccordionDetails, Button, makeStyles, Grid,
} from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import { Field, FieldArray } from 'formik';

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
  test: {
    display: 'inline-block',
  },
}));

function EnvironmentVariablesCard({ envVars }) {
  const classes = useStyles();

  const validateEnvVars = (input) => {
    let error;
    if (!input) {
      error = 'Required or Delete Row';
    }
    return error;
  };

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
            name="envVars"
            render={(arrayHelpers) => (
              <>
                {envVars.map((envVar, idx) => (
                  <React.Fragment key={idx}>
                    <Grid item xs={5}>
                      <Field
                        component={TextField}
                        variant="outlined"
                        name={`envVars[${idx}].key`}
                        value={envVar.key || ''}
                        placeholder="Key"
                        id={`envVars-${idx}`}
                        fullWidth
                        validate={validateEnvVars}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Field
                        component={TextField}
                        variant="outlined"
                        name={`envVars[${idx}].value`}
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
                <button
                  type="button"
                  onClick={() => arrayHelpers.push({ key: '', value: '' })}
                >
                  +
                </button>
              </>
            )}
          />
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}

export default EnvironmentVariablesCard;
