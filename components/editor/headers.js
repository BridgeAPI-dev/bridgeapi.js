import { Accordion, AccordionDetails, AccordionSummary, Button, Container, Typography, makeStyles, TextField, Grid, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Field } from "formik";

const useStyles = makeStyles((theme) => ({
  pullRight: {
    position: "absolute",
    right: theme.spacing(2),
  },
  heading: {
    fontWeight: "bold",
  },
  dinlineblock: {
    display: "inline-block"
  },
  subtitle: {
    color: "#a6a6a4",
    marginLeft: theme.spacing(1),
  },
  noMargins: {
    margin: 0,
    padding: 0,
  },
  outboundLabel: {
    display: "inline-block",
    verticalAlign: "-18px",
    marginRight: theme.spacing(1),
  },

  outboundURLField: {
    width: "25%",
    marginBottom: theme.spacing(3),
  },
  headerSettingsInputs: {
    paddingTop: theme.spacing(2),
  },
  formControl: {
    width: "100%",
  },
  dropDown: {
    marginBottom: theme.spacing(1),
  },
}));

function Headers() {
  const classes = useStyles();
  return (
    <Accordion defaultExpanded>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography className={classes.heading}>Headers & Settings</Typography>
        <Typography variant="subtitle1" className={classes.subtitle}>Configure your outbound request</Typography>
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
            // value={values.password}
          />
          <Grid container spacing={5} className={classes.noMargins}>
            <Grid container spacing={2} xs={10} className={classes.headerSettingsInputs}>
              <Grid item xs={6}>
                <Field
                  component={TextField}
                  variant="outlined"
                  name="outboundURL"
                  placeholder="Content-Type"
                  fullWidth
                  disabled
                  className={classes.dinlineblock}
                  // value={values.password}
                />
              </Grid>
              <Grid item xs={6}>
                <Field
                  component={TextField}
                  variant="outlined"
                  name="outboundURL"
                  placeholder="application/json"
                  fullWidth
                  disabled
                  className={classes.dinlineblock}
                  // value={values.password}
                />
              </Grid>
              <Grid item xs={6}>
                <Field
                  component={TextField}
                  variant="outlined"
                  name="outboundURL"
                  placeholder="Key"
                  fullWidth
                  className={classes.dinlineblock}
                  // value={values.password}
                />
              </Grid>
              <Grid item xs={6}>
                <Field
                  component={TextField}
                  variant="outlined"
                  name="outboundURL"
                  placeholder="Value"
                  fullWidth
                  className={classes.dinlineblock}
                  // value={values.password}
                />
              </Grid>
            </Grid>
            <Grid item xs={2}>
              <FormControl className={classes.formControl}>
                <InputLabel id="methodLabel">Method</InputLabel>
                <Select
                  labelId="methodLabel"
                  name="method"
                  // value="none"
                  // onChange={handleChange('method')}
                  className={classes.dropDown}
                >
                  <MenuItem value="none">None</MenuItem>
                  <MenuItem value="Ten">Ten</MenuItem>
                  <MenuItem value="Twenty">Twenty</MenuItem>
                  <MenuItem value="Thirty">Thirty</MenuItem>
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel id="methodLabel">Retries</InputLabel>
                <Select
                  labelId="methodLabel"
                  name="method"
                  // value="none"
                  // onChange={handleChange('method')}
                  className={classes.dropDown}
                >
                  <MenuItem value="none">None</MenuItem>
                  <MenuItem value="Ten">Ten</MenuItem>
                  <MenuItem value="Twenty">Twenty</MenuItem>
                  <MenuItem value="Thirty">Thirty</MenuItem>
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel id="methodLabel">Delay</InputLabel>
                <Select
                  labelId="methodLabel"
                  name="method"
                  // value="none"
                  // onChange={handleChange('method')}
                  className={classes.dropDown}
                >
                  <MenuItem value="none">None</MenuItem>
                  <MenuItem value="Ten">Ten</MenuItem>
                  <MenuItem value="Twenty">Twenty</MenuItem>
                  <MenuItem value="Thirty">Thirty</MenuItem>
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

