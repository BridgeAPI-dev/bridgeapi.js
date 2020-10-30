import { Accordion, AccordionDetails, AccordionSummary, Button, Typography, makeStyles, Grid, TextField } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Field } from "formik";

const useStyles = makeStyles((theme) => ({
  heading: {
    fontWeight: "bold",
  },
  subtitle: {
    color: "#a6a6a4",
    marginLeft: theme.spacing(1),
  },
}));

function Envar() {
  const classes = useStyles();
  return (
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
  );
}

export default Envar;

