import { Accordion, AccordionDetails, AccordionSummary, Container, Typography, makeStyles, Grid } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  heading: {
    fontWeight: "bold",
  },
  subtitle: {
    color: "#a6a6a4",
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
        <Grid container direction="column" align="left">
          <Typography className={classes.heading}>Payload</Typography>
          <Typography variant="subtitle1" className={classes.subtitle}>Edit payload for outgoing request</Typography>
        </Grid>
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
            <AccordionDetails />
          </Accordion>
          <Typography>Edit outbound payload</Typography>
        </Container>
      </AccordionDetails>
    </Accordion>
  );
}

export default Payload;

