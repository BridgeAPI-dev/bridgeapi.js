import {
  Accordion, AccordionDetails, Button, Container, Typography, makeStyles,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PropTypes from 'prop-types';

import CodeMirror from '../../Codemirror';
import AccordionSummary from '../../AccordionSummary';

import api from '../../../utils/api';

const useStyles = makeStyles((theme) => ({
  pullRight: {
    position: 'absolute',
    right: theme.spacing(2),
  },
  heading: {
    fontWeight: 'bold',
  },
  testPayloadLabel: {
    margin: theme.spacing(2, 0),
  },
  payloadContainer: {
    padding: 0,
    margin: 0,
  },
  dinlineblock: {
    display: 'inline-block',
  },
}));

function BridgeTestCard({
  isEditView, values, slug, setOpen, setErrorOpen,
}) {
  const classes = useStyles();

  const handleClick = () => {
    api.post(`/events/${slug}`, values.testPayloadCode)
      .then(() => setOpen(true))
      .catch(() => setErrorOpen(true));
  };

  return (
    <Accordion defaultExpanded>
      <AccordionSummary
        icon={<ExpandMoreIcon />}
        title="Bridge Tester"
        subtitle="E2E Bridge Testing"
      />

      <AccordionDetails>
        <Container
          align="left"
          maxWidth={false}
          className={classes.payloadContainer}
        >
          <Typography>
            Content-Type: application/json
          </Typography>
          <Typography className={classes.dinlineblock}>
            Method: Post
          </Typography>

          <Button
            className={classes.pullRight}
            variant="outlined"
            color="secondary"
            onClick={handleClick}
            disabled={!slug}
          >
            Test Bridge
          </Button>
          <Typography className={classes.testPayloadLabel}>
            Test Payload
          </Typography>
          <CodeMirror
            formKey="testPayloadCode"
            isEditView={isEditView}
            values={values}
            id="test-payload"
          />
        </Container>
      </AccordionDetails>
    </Accordion>
  );
}

export default BridgeTestCard;

BridgeTestCard.propTypes = {
  values: PropTypes.shape({
    outboundUrl: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    retries: PropTypes.string.isRequired,
    delay: PropTypes.string.isRequired,
    headers: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
      }).isRequired,
    ).isRequired,
    environmentVariables: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
      }).isRequired,
    ).isRequired,
    payloadCode: PropTypes.string.isRequired,
    testPayloadCode: PropTypes.string.isRequired,
  }).isRequired,
  isEditView: PropTypes.bool.isRequired,
  slug: PropTypes.string.isRequired,
  setOpen: PropTypes.func.isRequired,
  setErrorOpen: PropTypes.func.isRequired,
};
