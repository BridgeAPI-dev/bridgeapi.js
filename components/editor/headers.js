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
import { Field } from 'formik';
import { useState } from 'react';

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

  outboundURLField: {
    width: '25%',
    marginBottom: theme.spacing(3),
  },
  headerSettingsInputs: {
    paddingTop: theme.spacing(2),
  },
  formControl: {
    width: '100%',
  },
  dropDown: {
    marginBottom: theme.spacing(1),
  },
}));

function Headers() {
  const [headerFields, setHeaderFields] = useState([1]);
  const classes = useStyles();

  function handleChange(event) {
    const id = Number(event.target.id.split('-')[2]);
    if (Number.isNaN(id)) return;

    if (id === headerFields.length - 1) {
      setHeaderFields([...headerFields, headerFields.length + 1]);
    }
  }

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
            placeholder="Specify your outbound service here"
            className={classes.outboundURLField}
          />
          <Grid container spacing={5} className={classes.noMargins}>
            <Grid container spacing={2} xs={10} className={classes.headerSettingsInputs}>
              <Grid item xs={6}>
                <Field
                  component={TextField}
                  variant="outlined"
                  placeholder="Content-Type"
                  fullWidth
                  disabled
                  className={classes.dinlineblock}
                />
              </Grid>
              <Grid item xs={6}>
                <Field
                  component={TextField}
                  variant="outlined"
                  placeholder="application/json"
                  fullWidth
                  disabled
                  className={classes.dinlineblock}
                />
              </Grid>
              { headerFields.map((_, i, self) => (
                <>
                  <Grid item id={`header-gkey-${i}`} xs={i !== self.length - 1 ? 5 : 6}>
                    <Field
                      component={TextField}
                      variant="outlined"
                      name={`header-key-${i}`}
                      placeholder="Key"
                      onChange={handleChange}
                      id={`header-key-${i}`}
                      fullWidth
                      className={classes.dinlineblock}
                    />
                  </Grid>
                  <Grid item id={`header-gvalue-${i}`} xs={6}>
                    <Field
                      component={TextField}
                      variant="outlined"
                      name={`header-value-${i}`}
                      placeholder="Value"
                      onChange={handleChange}
                      id={`header-value-${i}`}
                      fullWidth
                      className={classes.dinlineblock}
                    />
                  </Grid>
                  {i !== self.length - 1 && (
                    <Grid item id={`header-delete-${i}`} xs={1}>
                      <Button className={classes.primary} onClick={handleDelete}>
                        <DeleteForeverIcon fontSize="large" />
                      </Button>
                    </Grid>
                  )}
                </>
              ))}
            </Grid>
            <Grid item xs={2}>
              <FormControl className={classes.formControl}>
                <InputLabel id="methodLabel">Method</InputLabel>
                <Select
                  labelId="methodLabel"
                  name="method"
                  className={classes.dropDown}
                >
                  <MenuItem value="delete">Delete</MenuItem>
                  <MenuItem value="get">Get</MenuItem>
                  <MenuItem value="patch">Patch</MenuItem>
                  <MenuItem value="post">Post</MenuItem>
                  <MenuItem value="put">Put</MenuItem>
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel id="methodLabel">Retries</InputLabel>
                <Select
                  labelId="methodLabel"
                  name="method"
                  className={classes.dropDown}
                >
                  <MenuItem value="0">0 Retries</MenuItem>
                  <MenuItem value="1">1 Retries</MenuItem>
                  <MenuItem value="3">3 Retries</MenuItem>
                  <MenuItem value="5">5 Retries</MenuItem>
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel id="methodLabel">Delay</InputLabel>
                <Select
                  labelId="methodLabel"
                  name="method"
                  className={classes.dropDown}
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
