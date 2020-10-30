import { Accordion, AccordionDetails, AccordionSummary, Button, Typography, makeStyles, Grid, TextField, Box, Container } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { Field } from "formik";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  primary: {
    color: theme.palette.primary.main,
  },
  heading: {
    fontWeight: "bold",
  },
  subtitle: {
    color: "#a6a6a4",
  },
  noPadding: {
    padding: 0,
  },
  test: {
    display: "inline-block",
  },
}));

function Envar() {
  const [envarFields, setEnvarFields] = useState([1]);
  const classes = useStyles();

  function handleChange(event) {
    const id = Number(event.target.id.split('-')[2]);
    if (isNaN(id)) return;

    if (id === envarFields.length - 1) {
      setEnvarFields([...envarFields, envarFields.length + 1]);
    }
  }

  function handleDelete(event) {
    const id = Number(event.target.closest('div').id.split('-')[2]);
    if (isNaN(id)) return;

    document.getElementById(`envar-gkey-${id}`).remove();
    document.getElementById(`envar-gvalue-${id}`).remove();
    document.getElementById(`envar-delete-${id}`).remove();
  }

  return (
    <Accordion defaultExpanded>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Grid container direction="column" align="left">
          <Typography className={classes.heading}>Environment variables</Typography>
          <Typography variant="subtitle1" className={classes.subtitle}>Keep your secrets safe</Typography>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          { envarFields.map((_, i, self) => (
            <>
              <Grid id={`envar-gkey-${i}`} key={i} item xs={i !== self.length - 1 ? 5 : 6}>
                <Field
                  component={TextField}
                  variant="outlined"
                  name={`envar-key-${i}`}
                  placeholder="Key"
                  onChange={handleChange}
                  id={`envar-key-${i}`}
                  fullWidth
                />
              </Grid>
              <Grid id={`envar-gvalue-${i}`} item xs={6}>
                <Field
                  component={TextField}
                  variant="outlined"
                  name={`envar-value-${i}`}
                  placeholder="Value"
                  onChange={handleChange}
                  id={`envar-value-${i}`}
                  fullWidth
                />
              </Grid>
              {i !== self.length - 1 && (
                <Grid id={`envar-delete-${i}`} item xs={1}>
                  <Button className={classes.primary} onClick={handleDelete}>
                    <DeleteForeverIcon fontSize="large" />
                  </Button>
                </Grid>
              )}
            </>
          ))}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}

export default Envar;

