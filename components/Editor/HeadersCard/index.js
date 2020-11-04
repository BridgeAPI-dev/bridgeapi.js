import React from 'react';
import {
  Accordion,
  AccordionDetails,
  Container,
  Typography,
  makeStyles,
  Grid,
} from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Field } from 'formik';

import HeaderTextFields from './HeaderTextFields';
import MethodDropdown from './MethodDropdown';
import RetryDropdown from './RetryDropdown';
import DelayDropdown from './DelayDropdown';
import AccordionSummary from '../../AccordionSummary';

const useStyles = makeStyles((theme) => ({
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
}));

function HeaderCard({ headers, outboundURL }) {
  const classes = useStyles();

  const validateURL = (url) => {
    const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    let error;
    if (!url) {
      error = 'Required';
    } else if (!expression.test(url)) {
      error = 'Invalid URL';
    }
    return error;
  };

  return (
    <Accordion defaultExpanded>
      <AccordionSummary
        icon={<ExpandMoreIcon />}
        title="Headers & Settings"
        subtitle="Configure your outbound request"
      />
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
            value={outboundURL}
            validate={validateURL}
          />
          <Grid container spacing={2}>
            <Grid item xs={10}>
              <HeaderTextFields headers={headers} />
            </Grid>
            <Grid item xs={2}>
              <MethodDropdown />
              <RetryDropdown />
              <DelayDropdown />
            </Grid>
          </Grid>
        </Container>
      </AccordionDetails>
    </Accordion>
  );
}

export default HeaderCard;
