import {
  Container,
  Typography,
  Button,
  Grid,
  makeStyles,
  Link,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';

import Navbar from '../components/shared/dashboard/Navbar/index';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  dinlineblock: {
    display: "inline-block"
  },
  subtitle: {
    color: "#a6a6a4",
    marginLeft: theme.spacing(1),
  },
  headerSettingsInputs: {
    paddingTop: theme.spacing(2),
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
  buttonsContainer: {
    position: "absolute",
    display: "inline-block",
    right: theme.spacing(2),
  },
  form: {
    marginTop: theme.spacing(2),
  },
  action: {
    margin: theme.spacing(0, 1),
  },
  heading: {
    fontWeight: "bold",
  },
  payloadContainer: {
    padding: 0,
    margin: 0,
    width: "100%",
  },
  inboundPayloadAccordion: {
    marginBottom: theme.spacing(2),
  },
  dropDown: {
    marginBottom: theme.spacing(1),
  },
  formControl: {
    width: "100%",
  },
  pullRight: {
    position: "absolute",
    right: theme.spacing(2),
  },
  testPayloadLabel: {
    margin: theme.spacing(2, 0),
  },
}));

function Editor() {
  const classes = useStyles();

  const initialValues = {
  };

  const handleValidate = (values) => {
    const errors = {};
    return errors;
  };

  const handleSubmit = (values, setSubmitting) => {
    console.log(values);
    // TODO: axios request
    setTimeout(() => {
      setSubmitting(false);
    }, 500);
  };

  return (
    <>
      <Navbar />
      <Container align="center" maxWidth={false} className={classes.root}>
        <Typography variant="subtitle2">Send your events here</Typography>
        <Typography variant="h5" className={classes.dinlineblock}>https://bridgeapi.dev/b13923/inbound</Typography>
        <Box className={classes.buttonsContainer}>
          <Button variant="outlined" color="secondary" className={classes.action}>Actions</Button>
          <Button variant="contained" color="primary">Save</Button>
        </Box>
        <Formik
          initialValues={initialValues}
          validate={(values) => handleValidate(values)}
          onSubmit={(values, { setSubmitting }) => handleSubmit(values, setSubmitting)}
        >
          {({
            submitForm, isSubmitting, values, handleChange
          }) => (
            <Form className={classes.form}>
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
                  <Container align="center" disableGutters>
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
                    <Grid container spacing={4}>
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
              <Accordion defaultExpanded>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.heading}>Environment variables</Typography>
                  <Typography variant="subtitle1" className={classes.subtitle}>Keep your secrets safe</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Field
                        component={TextField}
                        variant="outlined"
                        name="outboundURL"
                        placeholder="Key"
                        fullWidth
                        // value={values.password}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Field
                        component={TextField}
                        variant="outlined"
                        name="outboundURL"
                        placeholder="Value"
                        className={classes.EVField}
                        fullWidth
                        // value={values.password}
                      />
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
              <Accordion defaultExpanded>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.heading}>Payload</Typography>
                  <Typography variant="subtitle1" className={classes.subtitle}>Edit payload for outgoing request</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Container align="left" maxWidth={false} className={classes.payloadContainer}>
                    <Accordion className={classes.inboundPayloadAccordion}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography className={classes.heading}>View latest inbound payload</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                          sit amet blandit leo lobortis eget.
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                    <Typography>Edit outbound payload</Typography>
                  </Container>
                </AccordionDetails>
              </Accordion>
              <Accordion defaultExpanded>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.heading}>Bridge Tester</Typography>
                  <Typography variant="subtitle1" className={classes.subtitle}>E2E Bridge Testing</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Container align="left" maxWidth={false} className={classes.payloadContainer}>
                    <Typography align="center" className={classes.heading}>URL: https://bridgeapi.dev/b12873/inbound</Typography>
                    <Typography>Content-Type: application/json</Typography>
                    <Typography className={classes.dinlineblock}>Method: Post</Typography>
                    <Button className={classes.pullRight} variant="outlined" color="secondary">Test Bridge</Button>
                    <Typography className={classes.testPayloadLabel}>Test Payload</Typography>
                  </Container>
                </AccordionDetails>
              </Accordion>
            </Form>
          )}
        </Formik>
      </Container>
    </>
  );
}

export default Editor;
