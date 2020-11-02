import {
  Accordion, AccordionDetails, AccordionSummary, Button, Typography, makeStyles, Grid, TextField,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { Field, useFormikContext } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import uuid from 'react-uuid';

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
  const [envarFields, setEnvarFields] = useState([uuid()]);
  const [lastInputId, setLastInputId] = useState();
  const lastInput = useRef();
  const classes = useStyles();

  function fieldChanged(event, createNewField) {
    setLastInputId(event.target.id);

    if (envarFields.length !== 1) setFieldValue(event.target.id, event.target.value);

    if (createNewField) {
      setEnvarFields([...envarFields, uuid()]);
    }
  }

  useEffect(() => {
    if (lastInput.current) lastInput.current.focus();
    lastInput.current = null;
  });

  function handleDelete(event) {
    const idArray = event.target.closest('[id^=header]').id.split('-');
    const id = idArray.slice(2, idArray.length).join('-');
    const index = envarFields.findIndex((field) => field === id);

    setEnvarFields(envarFields.filter((_, i) => i !== index));
  }

  return (
    <Accordion defaultExpanded>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Grid container direction="column" align="left">
          <Typography className={classes.heading}>Environment variables</Typography>
          <Typography variant="subtitle1" className={classes.subtitle}>Keep your secrets safe</Typography>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          { envarFields.map((k, i, self) => (
            <React.Fragment key={uuid()}>
              <Grid item xs={i !== self.length - 1 ? 5 : 6}>
                <Field
                  component={TextField}
                  variant="outlined"
                  name={`envar-key-${k}`}
                  id={`envar-key-${k}`}
                  placeholder="Key"
                  onChange={(e) => fieldChanged(e, i === self.length - 1)}
                  inputRef={`envar-key-${k}` === lastInputId ? lastInput : undefined}
                  value={values[`envar-key-${k}`]}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <Field
                  component={TextField}
                  variant="outlined"
                  name={`envar-value-${k}`}
                  id={`envar-value-${k}`}
                  placeholder="Key"
                  onChange={(e) => fieldChanged(e, i === self.length - 1)}
                  inputRef={`envar-value-${k}` === lastInputId ? lastInput : undefined}
                  value={values[`envar-value-${k}`]}
                  fullWidth
                />
              </Grid>
              {i !== self.length - 1 && (
                <Grid id={`envar-delete-${i}`} item xs={1}>
                  <Button className={classes.primary} onClick={handleDelete}>
                    <DeleteForeverIcon fontSize="large" />
                  </Button>
                </Grid>
              )}
            </React.Fragment>
          ))}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}

export default Envar;
