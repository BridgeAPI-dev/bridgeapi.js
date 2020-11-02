import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Container,
  Typography,
  makeStyles,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { Field, useFormikContext } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import uuid from 'react-uuid';

const useStyles = makeStyles((theme) => ({
  pullRight: {
    position: 'absolute',
    right: theme.spacing(2),
  },
  heading: {
    fontWeight: 'bold',
  },
  dinlineblock: {
    display: 'inline-block',
  },
  subtitle: {
    color: '#a6a6a4',
  },
  noMargins: {
    margin: 0,
    padding: 0,
  },
  outboundLabel: {
    display: 'inline-block',
    verticalAlign: '-18px',
    marginRight: theme.spacing(1),
  },
  formControl: {
    width: "100%",
  },
  outboundURLField: {
    width: '25%',
    marginBottom: theme.spacing(3),
  },
  dropDown: {
    marginBottom: theme.spacing(1),
  },
  primary: {
    color: theme.palette.primary.main,
  },
}));

const initialFieldState = {};
initialFieldState[uuid()] = '';

function Headers() {
  const { values, setFieldValue } = useFormikContext();
  const [headerFields, setHeaderFields] = useState(initialFieldState);
  const [lastInputId, setLastInputId] = useState();
  const lastInput = useRef();
  const classes = useStyles();

  function fieldChanged(event, createNewField) {
    setLastInputId(event.target.id);

    if (Object.keys(headerFields).length !== 1) setFieldValue(event.target.id, event.target.value);

    if (createNewField) {
      const newField = {};
      newField[uuid()] = '';
      setHeaderFields({ ...headerFields, ...newField });
    }
  }

  useEffect(() => {
    if (lastInput.current) lastInput.current.focus();
    lastInput.current = null;
  });

  function handleDelete(event) {
    const id = Number(event.target.closest('div').id.split('-')[2]);
    if (Number.isNaN(id)) return;

    document.getElementById(`header-gkey-${id}`).remove();
    document.getElementById(`header-gvalue-${id}`).remove();
    document.getElementById(`header-delete-${id}`).remove();
  }

  return (
    <Accordion defaultExpanded>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Grid container direction="column" align="left">
          <Typography className={classes.heading}>Headers & Settings</Typography>
          <Typography variant="subtitle1" className={classes.subtitle}>Configure your outbound request</Typography>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Container maxWidth={false} align="center" className={classes.noMargins}>
          <Typography
            className={classes.outboundLabel}
          >
            Outbound URL:
          </Typography>
          <Field
            component={TextField}
            variant="outlined"
            name="outboundURL"
            id="outboundURL"
            onChange={(e) => {
              setFieldValue(e.target.id, e.target.value);
              setLastInputId(null);
            }}
            placeholder="Specify your outbound service here"
            className={classes.outboundURLField}
          />
          <Grid container spacing={2}>
            <Grid item xs={10}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Field
                    component={TextField}
                    variant="outlined"
                    placeholder="Content-Type"
                    fullWidth
                    disabled
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    component={TextField}
                    variant="outlined"
                    placeholder="application/json"
                    fullWidth
                    disabled
                  />
                </Grid>
                { Object.keys(headerFields).map((k, i, self) => (
                  <React.Fragment key={uuid()}>
                    <Grid item id={`header-gkey-${k}`} xs={i === self.length - 1 ? 6 : 5}>
                      <Field
                        component={TextField}
                        variant="outlined"
                        name={`header-key-${k}`}
                        id={`header-key-${k}`}
                        placeholder="Key"
                        onChange={(e) => fieldChanged(e, i === self.length - 1)}
                        inputRef={`header-key-${k}` === lastInputId ? lastInput : undefined}
                        value={values[`header-key-${k}`]}
                        fullWidth
                      />
                    </Grid>
                    <Grid item id={`header-gvalue-${k}`} xs={6}>
                      <Field
                        component={TextField}
                        variant="outlined"
                        name={`header-value-${k}`}
                        id={`header-value-${k}`}
                        placeholder="Value"
                        onChange={(e) => fieldChanged(e, i === self.length - 1)}
                        inputRef={`header-value-${k}` === lastInputId ? lastInput : undefined}
                        value={values[`header-value-${k}`]}
                        fullWidth
                      />
                    </Grid>
                    { i !== self.length - 1 && (
                      <Grid item id={`header-delete-${k}`} xs={1}>
                        <Button className={classes.primary} onClick={handleDelete}>
                          <DeleteForeverIcon fontSize="large" />
                        </Button>
                      </Grid>
                    )}
                  </React.Fragment>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={2}>
              <FormControl className={classes.formControl}>
                <InputLabel id="methodLabel">Method</InputLabel>
                <Select
                  labelId="methodLabel"
                  name="method"
                  className={classes.dropDown}
                  onChange={(e) => setFieldValue('method', e.target.value)}
                  value={values['method']}
                >
                  <MenuItem value="delete">Delete</MenuItem>
                  <MenuItem value="get">Get</MenuItem>
                  <MenuItem value="patch">Patch</MenuItem>
                  <MenuItem value="post">Post</MenuItem>
                  <MenuItem value="put">Put</MenuItem>
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel id="retriesLabel">Retries</InputLabel>
                <Select
                  labelId="retriesLabel"
                  name="retries"
                  className={classes.dropDown}
                  onChange={(e) => setFieldValue('retries', e.target.value)}
                  value={values['retries']}
                >
                  <MenuItem value="0">0 Retries</MenuItem>
                  <MenuItem value="1">1 Retries</MenuItem>
                  <MenuItem value="3">3 Retries</MenuItem>
                  <MenuItem value="5">5 Retries</MenuItem>
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel id="delayLabel">Delay</InputLabel>
                <Select
                  labelId="delayLabel"
                  name="delay"
                  className={classes.dropDown}
                  onChange={(e) => setFieldValue('delay', e.target.value)}
                  value={values['delay']}
                >
                  <MenuItem value="0">Instant</MenuItem>
                  <MenuItem value="15">15 Minutes</MenuItem>
                  <MenuItem value="30">30 Minutes</MenuItem>
                  <MenuItem value="1h">1 Hour</MenuItem>
                  <MenuItem value="1d">1 Day</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Container>
      </AccordionDetails>
    </Accordion>
  );
}

export default Headers;
