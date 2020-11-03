import {
  Accordion, AccordionDetails, Container, Typography, makeStyles, AccordionSummary as MUIAccordionSummary,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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

function Payload() {
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
            <AccordionDetails />
          </Accordion>

          <Typography>Edit outbound payload</Typography>
        </Container>
      </AccordionDetails>
    </Accordion>
  );
}

export default Payload;
