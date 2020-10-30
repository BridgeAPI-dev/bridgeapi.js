import { Accordion, AccordionDetails, AccordionSummary, Button, Container, Typography, makeStyles } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  heading: {
    fontWeight: "bold",
  },
  subtitle: {
    color: "#a6a6a4",
    marginLeft: theme.spacing(1),
  },
  payloadContainer: {
    padding: 0,
    margin: 0,
    width: "100%",
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
  );
}

export default Payload;

