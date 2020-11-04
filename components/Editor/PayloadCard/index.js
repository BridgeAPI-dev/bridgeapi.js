/* eslint-disable global-require */
import PropTypes from 'prop-types';
import {
  Accordion,
  AccordionDetails,
  Container,
  Typography,
  makeStyles,
  AccordionSummary as MUIAccordionSummary,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import CodeMirror from '../../Codemirror';
import AccordionSummary from '../../AccordionSummary';

const useStyles = makeStyles((theme) => ({
  heading: {
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#a6a6a4',
  },
  payloadContainer: {
    padding: 0,
    margin: 0,
    width: '100%',
  },
  inboundPayloadAccordion: {
    marginBottom: theme.spacing(2),
  },
}));

function PayloadCard({ isEditView, values }) {
  const classes = useStyles();

  return (
    <Accordion defaultExpanded>
      <AccordionSummary
        icon={<ExpandMoreIcon />}
        title="Payload"
        subtitle="Edit payload for outgoing request"
      />

      <AccordionDetails>
        <Container
          align="left"
          maxWidth={false}
          className={classes.payloadContainer}
        >
          <Accordion className={classes.inboundPayloadAccordion}>
            <MUIAccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>
                View latest inbound payload
              </Typography>

            </MUIAccordionSummary>
            <AccordionDetails>
              <Container
                align="left"
                maxWidth={false}
                className={classes.payloadContainer}
              >

                <CodeMirror readOnly isEditView={isEditView} />
              </Container>
            </AccordionDetails>
          </Accordion>

          <Typography>Edit outbound payload</Typography>
          <CodeMirror formKey="payloadCode" isEditView={isEditView} values={values} />

        </Container>
      </AccordionDetails>
    </Accordion>
  );
}

export default PayloadCard;

PayloadCard.propTypes = {
  isEditView: PropTypes.bool.isRequired,
  values: PropTypes.shape({
    outboundURL: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    retries: PropTypes.string.isRequired,
    delay: PropTypes.string.isRequired,
    headers: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
      }).isRequired,
    ).isRequired,
    envVars: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
      }).isRequired,
    ).isRequired,
  }).isRequired,
};
