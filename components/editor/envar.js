import {
  Accordion, AccordionDetails, AccordionSummary, Button, Typography, makeStyles, Grid,
} from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import { Field, FieldArray, useFormikContext } from 'formik';

import React from 'react';

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

function Envar() {
  const { values, setFieldValue } = useFormikContext();
  const classes = useStyles();

  function fieldChanged(event, arrayHelpers, createNewField) {
    setFieldValue(event.target.name, event.target.value);

    if (createNewField) {
      arrayHelpers.push('');
    }
  }

  function handleDelete(arrayHelpers, index) {
    arrayHelpers.remove(index);
    setFieldValue('envar-values', values['envar-values'].filter((_, i) => i !== index));
    console.log(values);
  }

  return (
    <Accordion defaultExpanded>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
      >
        <Grid container direction="column" align="left">
          <Typography className={classes.heading}>Environment variables</Typography>
          <Typography variant="subtitle1" className={classes.subtitle}>Keep your secrets safe</Typography>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          <FieldArray
            name="envar-keys"
            render={(arrayHelpers) => values['envar-keys'].map((k, i, self) => (
              <React.Fragment key={`${i}-${JSON.stringify(self)}`}>
                <Grid item xs={5}>
                  <Field
                    component={TextField}
                    variant="outlined"
                    name={`envar-keys[${i}]`}
                    placeholder="Key"
                    onChange={(e) => fieldChanged(e, arrayHelpers, i === self.length - 1)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    component={TextField}
                    variant="outlined"
                    name={`envar-values[${i}]`}
                    placeholder="Value"
                    onChange={(e) => fieldChanged(e, arrayHelpers, i === self.length - 1)}
                    fullWidth
                  />
                </Grid>
                { i !== self.length - 1 && (
                <Grid item xs={1}>
                  <Button
                    className={classes.primary}
                    onClick={() => { handleDelete(arrayHelpers, i); }}
                  >
                    <DeleteForeverIcon fontSize="large" />
                  </Button>
                </Grid>
                )}
              </React.Fragment>
            ))}
          />
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}

export default Envar;
