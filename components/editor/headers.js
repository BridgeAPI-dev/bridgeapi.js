import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Container,
  Typography,
  makeStyles,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { Field, FieldArray, useFormikContext } from 'formik';
import React from 'react';

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
    width: '100%',
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

function Headers() {
  const { values, setFieldValue } = useFormikContext();
  const classes = useStyles();

  function fieldChanged(event, arrayHelpers, createNewField) {
    console.log(event.target.name, event.target.value);
    setFieldValue(event.target.name, event.target.value);

    if (createNewField) {
      arrayHelpers.push('');
    }
  }

  function handleDelete(arrayHelpers, index) {
    arrayHelpers.remove(index);
    setFieldValue('header-values', values['header-values'].filter((_, i) => i !== index));
  }

  return (
    <Accordion defaultExpanded>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
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
            placeholder="Specify your outbound service here"
            className={classes.outboundURLField}
          />
          <Grid container spacing={2}>
            <Grid item xs={10}>
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
                  name="header-keys"
                  render={(arrayHelpers) => values['header-keys'].map((k, i, self) => (
                    <React.Fragment key={k}>
                      <Grid item xs={5}>
                        <Field
                          component={TextField}
                          variant="outlined"
                          name={`header-keys[${i}]`}
                          placeholder="Value"
                          onChange={(e) => fieldChanged(e, arrayHelpers, i === self.length - 1)}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Field
                          component={TextField}
                          variant="outlined"
                          name={`header-values[${i}]`}
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
            </Grid>
            <Grid item xs={2}>
              <FormControl className={classes.formControl}>
                <InputLabel id="methodLabel">Method</InputLabel>
                <Select
                  labelId="methodLabel"
                  name="method"
                  className={classes.dropDown}
                  onChange={(e) => setFieldValue('method', e.target.value)}
                  value={values.method}
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
                  value={values.retries}
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
                  value={values.delay}
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
