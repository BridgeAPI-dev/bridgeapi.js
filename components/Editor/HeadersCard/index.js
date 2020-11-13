import React from 'react';
import PropTypes from 'prop-types';
import {
  Accordion,
  AccordionDetails,
  Container,
  Typography,
  makeStyles,
  Grid,
  FormControlLabel,
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
  outboundURLField: {
    marginBottom: theme.spacing(0.5),
    marginTop: theme.spacing(1),
  },
}));

function HeaderCard({ headers, outboundUrl, title }) {
  const classes = useStyles();

  const validateURL = (url) => {
    const expression = /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/gi;
    let error;
    if (!url) {
      error = 'Required';
    } else if (!expression.test(url)) {
      error = 'Invalid URL';
    }
    return error;
  };

  const validateTitle = (bridgeTitle) => {
    let error;
    if (!bridgeTitle) {
      error = 'Required';
    } else if (bridgeTitle.size < 3) {
      error = 'Title must be at least 3 characters long';
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
        <Container className={classes.noMargins}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Field
                component={TextField}
                variant="outlined"
                name="title"
                id="title"
                placeholder="Give your bridge a name"
                className={classes.outboundURLField}
                value={title}
                validate={validateTitle}
                fullWidth
                label="Bridge Title"
              />
            </Grid>
            <Grid item xs={6}>
              <Field
                component={TextField}
                variant="outlined"
                name="outboundUrl"
                id="outboundUrl"
                placeholder="Specify your outbound service here"
                className={classes.outboundURLField}
                value={outboundUrl}
                validate={validateURL}
                fullWidth
                label="Outbound URL"
              />
            </Grid>
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

HeaderCard.propTypes = {
  title: PropTypes.string.isRequired,
  outboundUrl: PropTypes.string.isRequired,
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
