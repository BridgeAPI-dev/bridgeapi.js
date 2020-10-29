import {
  Container,
  Typography,
  Button,
  Grid,
  makeStyles,
  Link,
  Paper,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  dinlineblock: {
    display: "inline-block"
  },
  subtitle: {
    color: "grey",
    marginLeft: theme.spacing(1),
  },
  buttonsContainer: {
    position: "absolute",
    display: "inline-block",
    right: theme.spacing(2),
  },
  action: {
    margin: theme.spacing(0, 1),
  },
  heading: {
    fontWeight: "bold",
  },
  test: {
    width: "100%",
    marginTop: theme.spacing(2),
  },
}));

function Editor() {
  const classes = useStyles();

  const initialValues = {
    email: '',
    password: '',
  };

  const handleValidate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid Email Address';
    }
    if (!values.password) {
      errors.password = 'Required';
    }
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
    <Container align="center" maxWidth={false} className={classes.root}>
      <Typography variant="subtitle2">Send your events here</Typography>
      <Typography variant="h5" className={classes.dinlineblock}>https://bridgeapi.dev/b13923/inbound</Typography>
      <Box className={classes.buttonsContainer}>
        <Button variant="outlined" color="secondary" className={classes.action}>Actions</Button>
        <Button variant="contained" color="primary">Save</Button>
      </Box>
      <Accordion defaultExpanded className={classes.test}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className={classes.test}
        >
          <Typography className={classes.heading}>Headers & Settings</Typography>
          <Typography variant="subtitle1" className={classes.subtitle}>Configure your outbound request</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>Accordion 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
}

export default Editor;
