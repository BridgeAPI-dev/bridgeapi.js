import { Accordion, AccordionDetails, AccordionSummary, Button, Container, Typography, makeStyles } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  pullRight: {
    position: "absolute",
    right: theme.spacing(2),
  },
  heading: {
    fontWeight: "bold",
  },
  testPayloadLabel: {
    margin: theme.spacing(2, 0),
  },
  dinlineblock: {
    display: "inline-block"
  },
  subtitle: {
    color: "#a6a6a4",
    marginLeft: theme.spacing(1),
  },
}));

function Tester() {
  const classes = useStyles();
  return (
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
  );
}

export default Tester;

